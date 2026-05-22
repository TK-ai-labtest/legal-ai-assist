import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "กรุณากรอกข้อความ" }, { status: 400 });
    }

    // 1. อ่านไฟล์คลังข้อสอบกฎหมายจาก data/data.json
    const filePath = path.join(process.cwd(), "data", "data.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const legalCases = JSON.parse(jsonData);

    // 2. ค้นหาเคสที่ตรรกะคดีใกล้เคียงที่สุดจาก Keywords
    let matchedCase = null;
    for (const legalCase of legalCases) {
      const hasKeyword = legalCase.keywords.some((keyword: string) =>
        message.toLowerCase().includes(keyword.toLowerCase())
      );
      if (hasKeyword) {
        matchedCase = legalCase;
        break;
      }
    }

    // 3. Guardrail: หากไม่พบกฎหมายที่เกี่ยวข้องในคลัง ให้ปฏิเสธการตอบทันทีเพื่อความปลอดภัย
    if (!matchedCase) {
      return NextResponse.json({
        answer: "ขออภัยด้วยครับ เรื่องราวที่คุณสอบถามไม่อยู่ในคลังฐานข้อมูลกฎหมายที่ระบบนิติการ AI assist ได้รับอนุญาตให้ตรวจสอบในขณะนี้ ระบบขอปฏิเสธการวินิจฉัยเพื่อป้องกันความผิดพลาดทางกฎหมายและป้องกันไม่ให้ AI มโนข้อกฎหมายขึ้นมาเองครับ",
        sourceUrl: null,
        sources: []
      });
    }

    // 4. เชื่อมต่อสมองทองคำ Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ระบบหลังบ้านยังไม่ได้หยอดกุญแจ API KEY" }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);

    // มัดรวมบริบท Context โดยใส่ช่อง legal_reasoning เข้าไปด้วยเพื่อให้ Gemini เดินสำนวนตามแบบแผนเป๊ะๆ
    const systemPrompt = `
      คุณคือ "นิติการ AI assist" ผู้ช่วยกฎหมายระดับสูง หน้าที่ของคุณคือวินิจฉัยข้อเท็จจริงที่ผู้ใช้ส่งมา โดยอิงตรรกะและแนวการให้เหตุผลจากคดีอ้างอิงที่กำหนดให้ด้านล่างนี้เท่านั้น ห้ามคิดเลขมาตราหรือหลักกฎหมายอื่นขึ้นมาเองเด็ดขาด
      
      [คดีอ้างอิงจากคลังข้อมูลกฎหมายของเรา]
      - ชื่อเรื่อง: ${matchedCase.title}
      - ข้อเท็จจริงต้นแบบ: ${matchedCase.fact_summary.join(" ")}
      - หลักกฎหมายที่เกี่ยวข้อง: ${matchedCase.legal_rules.join(", ")}
      - แนวตรรกะและการปรับบทกฎหมาย: ${matchedCase.legal_reasoning}
      - สรุปผลคดี (ธงคำตอบ): ${matchedCase.thong_answer}

      [กฎเกณฑ์การเขียนตอบสไตล์นักกฎหมายมืออาชีพ]
      1. เขียนตอบแยกโครงสร้างตามแบบแผนนิติศาสตร์ไทย (IRAC) เป็น 3 ส่วนให้ชัดเจนโดยใช้ Markdown ไฮไลต์หัวข้อหลัก:
         - **หลักกฎหมาย:** (สรุปรายชื่อมาตราและหลักเกณฑ์หลักที่ใช้ยึดถือในคดีนี้)
         - **วินิจฉัย:** (นำเรื่องราวข้อเท็จจริงปัจจุบันมาเขียนอธิบายปรับเข้าองค์ประกอบกฎหมายอย่างละเอียด ถ่ายทอดสำนวนและใช้คำเชื่อมสละสลวยเหมือนในแนวตรรกะคดีต้นแบบ เช่น การใช้คำว่า 'พิจารณาแล้วเห็นว่า', 'เมื่อข้อเท็จจริงปรากฏว่า', 'แม้ว่า...', 'ประกอบกับ...', 'อันถือเป็นการ...')
         - **สรุป:** (ฟันธงผลลัพธ์สุดท้ายแห่งคดีสั้นๆ ให้สอดคล้องกับธงคำตอบต้นแบบอย่างเคร่งครัด)
      2. ใช้ระดับภาษาเขียนที่เป็นทางการ รัดกุม และถูกต้องตามหลักการร่างคำฟ้อง/วินิจฉัยอรรถคดี
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // ผสานคำสั่งระบบและคำถามเข้าด้วยกันเพื่อความเสถียรสูงสุดของโครงสร้างคำตอบ
    const finalPrompt = `${systemPrompt}\n\n[ข้อเท็จจริงปัจจุบันที่ผู้ใช้ส่งมาให้วินิจฉัย]:\n${message}`;
    
    const result = await model.generateContent(finalPrompt);
    const aiResponse = result.response.text();

    // 5. ส่งคำตอบและลิงก์ประวัติคดีวาร์ปกลับไปแสดงผลที่หน้าบ้าน
    return NextResponse.json({
      answer: aiResponse,
      sourceUrl: matchedCase.source_url,
      sources: [
        { title: matchedCase.title, uri: matchedCase.source_url }
      ],
      mode: matchedCase.id === "case-001" ? 1 : (matchedCase.id === "case-002" ? 2 : 3)
    });

  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "ระบบหลังบ้านขัดข้อง กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
  }
}
