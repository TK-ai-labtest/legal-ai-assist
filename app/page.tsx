"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import {
    FileText,
    Layers,
    Scale,
    Presentation,
    XIcon,
    LoaderIcon,
    Paperclip,
    SendIcon,
    Command,
    ExternalLink,
    BookOpen,
    Info,
    CheckCircle2,
    Sparkles,
    Shield,
    Gavel
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

const isSandboxEnv = () => {
    if (typeof window === "undefined") return false;
    return (
        window.location.protocol === "blob:" ||
        window.location.origin === "null" ||
        window.location.hostname.includes("usercontent.goog") ||
        (!window.location.origin.startsWith("http") && !window.location.hostname.includes("localhost"))
    );
};

const simulateLegalResponse = async (prompt: string, activeMode: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const stepIndex = activeMode ? activeMode.stepIndex : null;
    let answer = "";
    let sources: any[] = [];
    const sourceUrl = "https://www.tcct.or.th";

    const cleanPrompt = prompt.trim();

    if (stepIndex === 1 || cleanPrompt.startsWith("/real-question")) {
        answer = `⚖️ **[1. Real Question? โจทย์จริงและการแยกสิทธิ 3 ฝ่าย]**\n\n**คำถามหลักของคดี:** เส้นแบ่งของการใช้สิทธิบริหารจัดการแพลตฟอร์ม ไปเริ่มกระทบสิทธิในการแข่งขันอย่างเป็นธรรมของผู้อื่นอยู่ที่ใด?\n\n**โครงสร้างและบทบาท 3 ฝ่ายหลักในธุรกิจ:**\n1. 🏢 **ฝ่ายเจ้าของแพลตฟอร์ม:** มีสิทธิบริหารจัดการ Data และปรับ UX/UI ซึ่งเป็นทรัพย์สินของตนเอง\n2. 🍳 **ฝ่ายร้านค้าอิสระ:** มีสิทธิตามสัญญาที่ทำไว้กับแพลตฟอร์ม และมีสิทธิในการแข่งขันทางการค้าอย่างเป็นธรรม\n3. 🚴 **ฝ่ายขนส่ง/ไรเดอร์:** มีสิทธิในการเข้าถึงโอกาสในการแข่งขันและรับงานอย่างเท่าเทียม\n\n*กฎหมายมองว่า การใช้อำนาจเหนือตลาดเพื่อกีดกันคู่แข่ง (Market Foreclosure) เกินขอบเขตสิทธิตามสัญญา ถือเป็นการปฏิบัติทางการค้าที่ไม่เป็นธรรม*`;
        sources = [
            { title: "แนวทางการพิจารณาพฤติกรรมการค้าที่ไม่เป็นธรรม - กขค.", uri: "https://www.tcct.or.th" }
        ];
        return { answer, sourceUrl, sources, mode: 1 };
    } else if (stepIndex === 2 || cleanPrompt.startsWith("/conclusion")) {
        answer = `⚖️ **[2. ข้อสรุปเบื้องต้น & บริบทกฎหมายไทย]**\n\n**การปรับบทกฎหมายเชิงลึก (Legal Framework):**\nพฤติกรรมการปรับอัลกอริทึมเอื้อประโยชน์ให้ธุรกิจขนส่งในเครือตัวเอง (Self-Preferencing) เสี่ยงเข้าข่ายละเมิด **พ.ร.บ. การแข่งขันทางการค้า พ.ศ. 2560**\n\n• **มาตรา 50:** การใช้อำนาจเหนือตลาดอย่างไม่เป็นธรรม (หากแพลตฟอร์มมีส่วนแบ่งตลาดสูงเข้าเกณฑ์ควบคุม)\n• **มาตรา 57:** การปฏิบัติทางการค้าที่ไม่เป็นธรรม กีดกัน หรือจำกัดโอกาสร้านค้ารายเล็ก\n\n**ข้อสู้ทางเศรษฐศาสตร์:** แพลตฟอร์มอาจอ้างเรื่อง 'การเพิ่มประสิทธิภาพของบริการ' (Operational Efficiency) แต่สมาคมฯ หักล้างว่าสร้างความเสียหายและปิดกั้นการแข่งขันอย่างเป็นธรรมอย่างร้ายแรง`;
        sources = [
            { title: "พ.ร.บ. การแข่งขันทางการค้า พ.ศ. 2560 มาตรา 50 และ 57", uri: "https://www.krisdika.go.th" }
        ];
        return { answer, sourceUrl, sources, mode: 2 };
    } else if (stepIndex === 3 || cleanPrompt.startsWith("/ai-reflection")) {
        answer = `🧠 **[3. AI Usage Reflection: จุดเด่นของการคิดย้อนศร]**\n\n**บทสะท้อนการใช้ AI ร่วมวิเคราะห์:**\n• **ปัญหาแรกที่พบ (AI Bias):** การโยนคำถามตรง ๆ แบบด่วนสรุปจะเจอกับอคติของระบบ (Search Bias) ที่รีบข้ามข้อเท็จจริงพุ่งไปตัดสินความผิดตามมาตรา 50, 57 ทันทีจากคำถามนำเรื่องสมาคมฯ ร้องเรียน\n• **วิธีการต่อยอดและแก้ไข:** การสั่งให้ AI 'คิดย้อนศร' บังคับให้แยก Fact ออกมาก่อนกฎหมาย เพื่อแจกแจงสิทธิพื้นฐานและบทบาทของทั้ง 3 ฝ่ายให้ชัดเจน\n\n**ผลลัพธ์การพัฒนา:** ทำให้เห็นภาพรวมข้อพิพาทอย่างเป็นกลาง ไม่ด่วนสรุปตามคำถามนำ และมองเห็นแนวทางป้องกันข้อพิพาทที่พึงมีต่อสิทธิทุกฝ่ายอย่างแท้จริง`;
        sources = [
            { title: "เทคนิคการจัดการ Prompt Bias ในงานกฎหมายดิจิทัล", uri: "https://www.etda.or.th" }
        ];
        return { answer, sourceUrl, sources, mode: 3 };
    } else if (stepIndex === 4 || cleanPrompt.startsWith("/framework")) {
        answer = `📦 **[4. Framework คดีศึกษาเทียบเคียงระดับสากล]**\n\n**คดีตัวอย่างในต่างประเทศและในไทย:**\n\n• 📦 **Amazon Buy Box Case:** คดีระดับโลกที่ Amazon จัดอันดับหน้าเว็บให้กล่องซื้อสินค้าเอื้อประโยชน์ต่อผู้ขายที่ยอมใช้บริการคลังสินค้าและการจัดส่งของ Amazon เอง ถือเป็นรากฐานของประเด็น Self-Preferencing\n• 🧡 **Shopee Express Case:** เคสในไทยที่มีการตั้งข้อสังเกตเรื่องการเลือกหรือผูกกล่องขนส่งในเครือให้ผู้ซื้อโดยอัตโนมัติ\n• 🚨 **บทเรียนรวบยอด:** แพลตฟอร์มมีสิทธิในทรัพย์สินระบบคอมพิวเตอร์ของตน แต่ไม่มีสิทธิใช้โครงสร้างพื้นฐานนั้นมาบิดเบือนกลไกตลาดเสรี`;
        sources = [
            { title: "European Commission - Amazon Antitrust Case", uri: "https://ec.europa.eu" }
        ];
        return { answer, sourceUrl, sources, mode: 4 };
    } else {
        return {
            answer: `สวัสดีครับ^^ จานหยก เวอร์ชันนี้เป็นเวอร์ชัน beta ที่ผมพัฒนาขึ้นเพื่อรองรับการ Assist จารย์ แบบ second brain ครับ \n\nตอนนี้ในช่องนี้ยังตอบไม่ได้ แต่จานสามารถกดปุ่ม real question/สรุปเบื้องต้น/framework ได้เลยครับ คำตอบจะขึ้นมาเลย\n\n---\n\n👨‍💻 **แนะนำประวัติโดยย่อ (Resume):**\n• **ชื่อ:** ตามพล กาญจนสุธา (ตาม)\n• **การศึกษา:** จบนิติศาตร์ มธ.\n\n• **ประสบการณ์ทำงาน:** \n  - เคยทำ lawfirm / area พวกงานสัญญา / ที่ดิน\n  - เคยทำ บลป. ดูกฎเกณฑ์ กลต. มีความรู้เกี่ยวกับด้าน investment ทั้งฝั่ง fund manager + risk management ตามเกณฑ์ กลต.\n\n• **ความสนใจและทักษะเทคโนโลยี:** ชอบฝั่ง digital asset แต่ยังถนัดฝั่ง traditional มากกว่า แต่ก็พยายามเรียนรู้ฝั่ง digital มากขึ้น ชอบ AI เรียนรู้ร่วมกัน พัฒนา web / github+vercel\n\n• **จุดเด่นเฉพาะทาง:** ปัจจุบันทำงานหลากหลาย ทั้งฝั่งราชการ/เอกชน ถ้า area สัญญาจะถนัดสัญญาตามแบบภาครัฐ ตามรูปแบบที่อัยการฯ รีวิวไว้ ซึ่งออกเป็นประกาศฯ\n\n📢 **ความในใจ:** ชอบ content จาน ตาม FB ดูมีความรู้กว้างดีและมีเรื่องน่าคิดหลายมิติ สไตล์ firm ดีครับ เลยลองสมัครเข้ามา เพื่อมีโปรเจกต์ที่สามารถช่วยจารย์ได้ครับ\n\nขอบคุณครับ`,
            sourceUrl: "https://facebook.com",
            sources: [],
            mode: 99
        };
    }
};

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number, maxHeight: number }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    containerClassName?: string;
    showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, containerClassName, showRing = true, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        return (
            <div className={cn("relative w-full", containerClassName)}>
                <textarea
                    className={cn(
                        "flex min-h-[60px] w-full rounded-xl border border-white/5 bg-white/[0.01] px-4 py-3 text-sm text-white/90",
                        "transition-all duration-300 ease-in-out placeholder:text-white/20",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        showRing ? "focus-visible:outline-none focus-visible:ring-0" : "",
                        className
                    )}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {showRing && isFocused && (
                    <motion.span
                        className="absolute inset-0 rounded-xl pointer-events-none ring-2 ring-violet-500/30 border border-violet-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    />
                )}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export default function App() {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>();
    const [isTyping, setIsTyping] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    const [currentMode, setCurrentMode] = useState<any>(null);
    const [legalResult, setLegalResult] = useState<any>(null);

const commandSuggestions = [
    {
        icon: <FileText className="w-4 h-4 text-sky-400" />,
        label: "1. Lab Overview",
        description: "ภาพรวม new ประจำวัน + ข้อมูลเชิงสถิติ",
        descColor: "text-sky-300/90",
        prefix: "/lab-overview",
        color: "from-sky-500/20 to-blue-500/5 border-sky-500/20 text-sky-400",
        stepIndex: 1
    },
    {
        icon: <Layers className="w-4 h-4 text-red-400" />,
        label: "2. War Zone",
        description: "นั่งบนภูมองตำแหน่งและพื้นที่การรบ ผ่าน OI style old school",
        descColor: "text-red-400 font-medium",
        prefix: "/war-zone",
        color: "from-red-500/20 to-rose-500/5 border-red-500/20 text-red-400",
        stepIndex: 2
    },
    {
        icon: <Scale className="w-4 h-4 text-indigo-400" />,
        label: "3. Strategy Sandbox",
        description: "อยากมองแบบไหน เข้ามาเบิ่ง",
        descColor: "text-indigo-300/90",
        prefix: "/strategy-sandbox",
        color: "from-indigo-500/20 to-violet-500/5 border-indigo-500/20 text-indigo-400",
        stepIndex: 3
    },
    {
        icon: <Presentation className="w-4 h-4 text-emerald-400" />,
        label: "4. Execution",
        description: "ฝึกหวด บนข้อมูลเท่าที่มี",
        descColor: "text-emerald-300/90",
        prefix: "/execution",
        color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20 text-emerald-400",
        stepIndex: 4
    },
];
    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);
            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );
            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex);
            } else {
                setActiveSuggestion(-1);
            }
        } else {
            setShowCommandPalette(false);
        }

        const activeCmd = commandSuggestions.find(cmd => value.startsWith(cmd.prefix + ' '));
        if (activeCmd) {
            setCurrentMode(activeCmd);
        } else if (!value.startsWith('/')) {
            setCurrentMode(null);
        }
    }, [value]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const commandButton = document.querySelector('[data-command-button]');

            if (commandPaletteRef.current &&
                !commandPaletteRef.current.contains(target) &&
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

const handleSendMessage = async () => {
        if (!value.trim()) return;

        const userPrompt = value;
        setValue("");
        adjustHeight(true);
        setIsTyping(true);
        setLegalResult(null); 

        try {
            // บังคับเรียกใช้ simulation เสมอ ไม่ว่าจะรันที่ไหน เพื่อให้พ่นหน้า Resume ของคุณตามพลทันที
            const simulatedData = await simulateLegalResponse(userPrompt, currentMode);
            setLegalResult(simulatedData);
        } catch (err) {
            console.error(err);
            setLegalResult({
                answer: "ไม่สามารถเชื่อมต่อระบบประมวลผลนิติการได้ในขณะนี้ กรุณาลองใหม่อีกครั้งครับ",
                sourceUrl: null,
                sources: [],
                mode: currentMode?.stepIndex || 3
            });
        } finally {
            setIsTyping(false);
        }
    };

    const handleAttachFile = () => {
        const mockFileName = `เอกสารแนบ-${Math.floor(Math.random() * 1000)}.pdf`;
        setAttachments(prev => [...(prev || []), mockFileName]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => (prev || []).filter((_, i) => i !== index));
    };

const selectCommandSuggestion = async (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(""); 
        setShowCommandPalette(false);
        setIsTyping(true);
        setLegalResult(null);

        // บังคับให้ระบบดึงบทวิเคราะห์คดีแพลตฟอร์มขึ้นมาแสดงทันทีโดยไม่ผ่าน API เก่า
        const simulatedData = await simulateLegalResponse(selectedCommand.prefix, selectedCommand);
        setLegalResult(simulatedData);
        setIsTyping(false);
    };
    return (
        <div className="min-h-screen flex flex-col w-full items-center justify-start bg-[#09090b] text-white p-4 md:p-8 relative overflow-x-hidden font-sans select-none selection:bg-violet-500/30 selection:text-white">
            
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full filter blur-[160px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="w-full max-w-3xl mx-auto relative z-10 pt-4 md:pt-12 space-y-8">
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
<div className="text-center space-y-4">
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="inline-block"
    >
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-2xl shadow-inner mb-3 justify-center">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] tracking-widest text-violet-300 font-mono uppercase font-bold">In Static tales platform</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/44 pb-2">
            investic-Lab
        </h1>
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mx-auto rounded-full" />
    </motion.div>
    <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
        ส่งตรงข้อมูลจาก instatic lab กระชับ เข้าใจง่าย สิ่งสำคัญคือการฝึกตัดสินใจบนข้อมูลคุณภาพ ปรับ parameter ในแบบที่คุณเลือก และ adjust exposure ที่เหมาะสม -- เหมาะกับสายลุยไม่คุยนาน-- ถ้าพร้อมแล้ว ไปลองใช้กันครับ
    </p>
</div>
<div className="grid grid-cols-4 gap-2 bg-white/[0.01] border border-white/5 p-2.5 rounded-2xl">
    {commandSuggestions.map((cmd, index) => {
        const isCurrent = currentMode?.prefix === cmd.prefix;
        const isProcessed = legalResult && (legalResult.mode >= cmd.stepIndex);
        return (
            <div 
                key={cmd.prefix}
                onClick={() => selectCommandSuggestion(index)}
                className={cn(
                    "flex flex-col items-center justify-start p-2.5 rounded-xl transition-all duration-300 text-center relative overflow-hidden cursor-pointer hover:bg-white/[0.04] active:scale-95 min-h-[95px]",
                    isCurrent ? "bg-violet-500/10 border border-violet-500/20" : "border border-transparent",
                    isProcessed ? "opacity-100" : "opacity-100"
                )}
            >
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 shrink-0",
                    isCurrent ? "bg-violet-500/20" : isProcessed ? "bg-zinc-800" : "bg-white/5"
                )}>
                    {cmd.icon}
                </div>
                <span className="text-[11px] md:text-xs font-semibold block text-zinc-100 mb-1">
                    {cmd.label}
                </span>
                <span className="text-[9px] md:text-[10px] text-zinc-400 block leading-tight font-light line-clamp-2">
                    {cmd.description}
                </span>
                {isCurrent && (
                    <motion.div 
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </div>
        );
    })}
</div>
                    <motion.div
                        className="relative backdrop-blur-3xl bg-[#0d0d11]/85 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.08)] overflow-visible transition-all"
                    >
                        <AnimatePresence>
                            {currentMode && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="absolute -top-3 left-6 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600/25 to-indigo-600/15 text-violet-300 border border-violet-500/30 flex items-center gap-2 shadow-lg shadow-violet-950/20 backdrop-blur-xl"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-violet-300" />
                                    <span>กำลังเรียกใช้: <strong className="text-white font-medium">{currentMode.label}</strong></span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showCommandPalette && (
                                <motion.div
                                    ref={commandPaletteRef}
                                    className="absolute left-3 right-3 bottom-full mb-3 backdrop-blur-2xl bg-[#09090c]/98 rounded-2xl z-50 shadow-2xl border border-white/10 overflow-hidden"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    <div className="p-2 space-y-1">
                                        <div className="px-4 py-2 text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center gap-1.5">
                                            <Command className="w-3 h-3" />
                                            <span>เลือกโมดูลประมวลผลงานนิติการ</span>
                                        </div>
                                        {commandSuggestions.map((suggestion, index) => (
                                            <button
                                                key={suggestion.prefix}
                                                type="button"
                                                className={cn(
                                                    "w-full flex items-center gap-4 px-4 py-3 text-left transition-all rounded-xl cursor-pointer outline-none",
                                                    activeSuggestion === index 
                                                        ? "bg-white/10 text-white" 
                                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                                )}
                                                onClick={() => selectCommandSuggestion(index)}
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                    {suggestion.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm text-zinc-100">{suggestion.label}</div>
                                                    <div className="text-zinc-500 text-xs mt-0.5 truncate">{suggestion.description}</div>
                                                </div>
                                                <div className="text-violet-400 font-mono text-[11px] bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-lg shrink-0">
                                                    {suggestion.prefix}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-5">
                            <Textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey && !showCommandPalette) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                placeholder="พิมพ์เรื่องราวคดีความ หรือเนื้อหาข้อพิพาทที่อยากวิเคราะห์สืบค้น..."
                                containerClassName="w-full"
                                className="w-full px-2 py-2 resize-none bg-transparent border-none text-white/90 text-sm md:text-base focus:outline-none placeholder:text-zinc-600 min-h-[60px]"
                                style={{ overflow: "hidden" }}
                                showRing={false}
                            />
                        </div>

                        <AnimatePresence>
                            {attachments && attachments.length > 0 && (
                                <motion.div 
                                    className="px-5 pb-4 flex gap-2 flex-wrap" 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: "auto" }} 
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {attachments.map((file, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs bg-white/[0.03] border border-white/5 py-2 px-3 rounded-xl text-zinc-300">
                                            <Paperclip className="w-3.5 h-3.5 text-zinc-500" />
                                            <span>{file}</span>
                                            <button 
                                                type="button"
                                                onClick={() => removeAttachment(index)} 
                                                className="text-zinc-500 hover:text-white p-0.5 rounded-lg hover:bg-white/5 transition-colors"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-4 bg-white/[0.01] rounded-b-3xl">
                            <div className="flex items-center gap-2">
                                <button 
                                    type="button" 
                                    onClick={handleAttachFile} 
                                    className="p-2.5 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors" 
                                    title="แนบเอกสารกฎหมาย"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowCommandPalette(!showCommandPalette)} 
                                    className="p-2.5 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors" 
                                    title="เรียกเมนูเครื่องมือ"
                                >
                                    <Command className="w-4 h-4" />
                                </button>
                            </div>

                            <motion.button
                                type="button"
                                onClick={handleSendMessage}
                                disabled={isTyping || !value.trim()}
                                className={cn(
                                    "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden",
                                    value.trim() 
                                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/20 active:scale-95 cursor-pointer" 
                                        : "bg-white/[0.04] text-zinc-500 cursor-not-allowed"
                                )}
                            >
                                {isTyping ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4" />}
                                <span>เริ่มวิเคราะห์คดี</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        {commandSuggestions.map((suggestion, index) => (
                            <button
                                key={suggestion.prefix}
                                type="button"
                                onClick={() => selectCommandSuggestion(index)}
                                className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 rounded-full text-xs text-zinc-400 hover:text-white transition-all cursor-pointer shadow-inner"
                            >
                                {suggestion.icon}
                                <span>{suggestion.label.split(" (")[0]}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {legalResult && (
                            <motion.div
                                className="p-6 md:p-8 rounded-3xl backdrop-blur-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl space-y-6 text-left relative overflow-hidden"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full filter blur-2xl pointer-events-none" />

                                <div className="flex items-start md:items-center justify-between border-b border-zinc-800/60 pb-4 gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                                            <Shield className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-zinc-100 text-sm md:text-base">ผลการวินิจฉัยทางกฎหมาย</h3>
                                            <span className="text-[10px] text-zinc-500 font-mono">CASE ASSESSMENT SYSTEM</span>
                                        </div>
                                    </div>
                                    <div className="text-[11px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                                        <span className="font-medium">ประมวลผลเสร็จสิ้น</span>
                                    </div>
                                </div>

<div className="space-y-6">
    {legalResult.mode === 1 ? (
        /* 👨‍💻 โหมดแยกส่วนคำถามมนุษย์ VS คำตอบ AI สำหรับปุ่ม 1. Real Question? */
        <div className="space-y-5">
            
            {/* 🟢 การ์ดฝั่งมนุษย์ (Strategic Human Input) */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-xl shadow-inner">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    👨‍💻 คำถามเชิงกลยุทธ์โดยผู้บริหาร (Human Input)
                </div>
                <div className="text-zinc-100 text-sm md:text-base font-semibold leading-relaxed">
                    คำถามจริงของเคสนี้คืออะไร?
                </div>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light pl-3 border-l border-zinc-800">
                    ในธุรกิจการขายสินค้าบนแพลตฟอร์ม มีผู้เล่นหลักที่คอยขับเคลื่อน/มีส่วนได้เสีย in ธุรกิจประเภทนี้กี่ฝ่าย และแต่ละฝ่ายมีสิทธิตามกฎหมาย/ตามสัญญา เพียงใด และเมื่อฝ่ายใดฝ่ายหนึ่ง เริ่มใช้สิทธิของตนเองกระทบฝ่ายอื่นแล้วนั้น เส้นแบ่งการใช้สิทธิของตนเองที่เริ่มกระทบสิทธิของฝ่ายอื่นกฎหมายมองเรื่องนี้อย่างไร
                </p>
            </div>

            {/* ตัวเชื่อมโยงกลาง */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                <div className="w-12 h-px bg-zinc-800" />
                <span>AI Processing Diagnostic</span>
                <div className="w-12 h-px bg-zinc-800" />
            </div>

            {/* 🟣 การ์ดฝั่ง AI (Automated Legal Diagnosis) */}
            <div className="bg-violet-500/[0.01] border border-violet-500/10 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    🤖 ผลการวิเคราะห์และจัดหมวดหมู่ระบบนิเวศ (AI Response)
                </div>
                <div className="text-sm md:text-base text-zinc-200 leading-relaxed whitespace-pre-wrap font-light prose prose-invert max-w-none">
                    {legalResult.answer}
                </div>
            </div>

        </div>
    ) : legalResult.mode === 2 ? (
        /* 🔸 โหมดแยกส่วนคำถามมนุษย์ VS คำตอบ AI สำหรับปุ่ม 2. ข้อสรุปเบื้องต้น */
        <div className="space-y-5">
            
            {/* 🟠 การ์ดฝั่งมนุษย์ (Strategic Human Insight) */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-xl shadow-inner">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    👨‍💻 การสกัดสิทธิและเงื่อนไขสัญญาโดยมนุษย์ (Human Insight)
                </div>
                <div className="text-zinc-100 text-sm md:text-base font-semibold leading-relaxed">
                    เบื้องต้นคำตอบที่ได้คือ มี 3 ฝ่ายหลัก คือ
                </div>
                
                <div className="text-zinc-300 text-xs md:text-sm leading-relaxed font-light space-y-2 pl-3 border-l border-zinc-800/60">
                    <p><strong>1. ฝ่ายเจ้าของแพลตฟอร์ม:</strong> มีสิทธิในการบริหารจัดการ Data การปรับ UX/UI ซึ่งเป็นทรัพย์สินของตัวเองได้</p>
                    <p><strong>2. ฝ่ายร้านค้า:</strong> มีสิทธิตามสัญญาที่ได้ทำกับแพลตฟอร์มไว้ และมีสิทธิในการแข่งขันอย่างเป็นธรรม</p>
                    <p><strong>3. ฝ่ายขนส่ง:</strong> มีสิทธิในการแข่งขันอย่างเป็นธรรม</p>
                    <p className="text-zinc-400 pt-2 border-t border-white/5 text-[11px] md:text-xs italic bg-white/[0.01] p-2 rounded-lg mt-2">
                        💡 <strong>ข้อสังเกตเพิ่มเติมเชิงคดี:</strong> กรณีตามปัญหาอาจแบ่งได้หลาย Case เช่น กรณีที่ร้านค้าทำสัญญาในตอนแรกซึ่งอาจไม่มีเงื่อนไขการเลือกขนส่ง หรืออาจเป็นกรณีที่แพลตฟอร์มแจ้งเงื่อนไขในสัญญาไว้ก่อนแล้ว ต้องตรวจสอบลึกลงไปว่าสิทธิตามสัญญามีรายละเอียดข้อผูกพันอย่างไร
                    </p>
                </div>
            </div>

            {/* ตัวเชื่อมโยงกลาง */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                <div className="w-12 h-px bg-zinc-800" />
                <span>AI Statutory Mapping</span>
                <div className="w-12 h-px bg-zinc-800" />
            </div>

            {/* 🟣 การ์ดฝั่ง AI (Automated Legal Diagnosis) */}
            <div className="bg-violet-500/[0.01] border border-violet-500/10 rounded-2xl p-5 space-y-3 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    🤖 บทปรับกฎหมายการแข่งขันทางการค้าไทย (AI Response)
                </div>
                <div className="text-sm md:text-base text-zinc-200 leading-relaxed whitespace-pre-wrap font-light prose prose-invert max-w-none">
                    {legalResult.answer}
                </div>
            </div>

        </div>
    ) : legalResult.mode === 4 ? (
        /* 🚀 โหมดวาด Flowchart พิเศษสำหรับปุ่ม 4. Framework */
        <div className="space-y-6">
            <div className="text-sm md:text-base text-zinc-200 leading-relaxed font-light border-b border-zinc-800 pb-3">
                ⚖️ **[4. Framework คดีศึกษาเทียบเคียงระดับสากลและในไทย]**
            </div>
            
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3 pt-2">
                
                {/* Step 1 */}
                <div className="flex-1 flex flex-col space-y-2">
                    <div className="text-xs md:text-sm font-semibold text-emerald-400 font-mono">1. โยนคำถามเปิด (Initial Prompt)</div>
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-between items-center text-center space-y-4 backdrop-blur-xl shadow-inner min-h-[160px]">
                        <div className="text-xs text-zinc-300 leading-relaxed">โยนคำถามตรงเพื่อจับภาพรวมคดีแบบเร็ว แต่ต้องระวังอคติของระบบ (Search Bias)</div>
                        <div className="flex gap-1 flex-wrap justify-center">
                            <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md">Search Bias</span>
                            <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">ด่วนสรุปข้อกฎหมาย</span>
                        </div>
                    </div>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center justify-center text-zinc-600 font-mono text-sm transform rotate-90 lg:rotate-0 py-1 font-bold">➔</div>

                {/* Step 2 */}
                <div className="flex-1 flex flex-col space-y-2">
                    <div className="text-xs md:text-sm font-semibold text-amber-400 font-mono">2. แยก Fact & สิทธิ 3 ฝ่าย</div>
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-between items-center text-center space-y-4 backdrop-blur-xl shadow-inner min-h-[160px]">
                        <div className="text-xs text-zinc-300 leading-relaxed">สั่ง AI คิดย้อนศรแยก Fact ออกจากความเห็น เพื่อกางสิทธิและบทบาทในระบบนิเวศ</div>
                        <div className="flex gap-1 flex-wrap justify-center">
                            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded-md">แพลตฟอร์ม</span>
                            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded-md">ร้านค้า</span>
                            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded-md">ไรเดอร์</span>
                        </div>
                    </div>
                </div>

                {/* Arrow 2 */}
                <div className="flex items-center justify-center text-zinc-600 font-mono text-sm transform rotate-90 lg:rotate-0 py-1 font-bold">➔</div>

                {/* Step 3 */}
                <div className="flex-1 flex flex-col space-y-2">
                    <div className="text-xs md:text-sm font-semibold text-violet-400 font-mono">3. เทียบเคียงคดีสากล</div>
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-between items-center text-center space-y-4 backdrop-blur-xl shadow-inner min-h-[160px]">
                        <div className="text-xs text-zinc-300 leading-relaxed">ดึงบรรทัดฐานคดีผูกขาดระดับโลกมาส่องกลไกจัดอันดับแอบเอื้อธุรกิจในเครือ</div>
                        <div className="flex gap-1 flex-wrap justify-center">
                            <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2 py-0.5 rounded-md">Amazon Buy Box</span>
                            <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2 py-0.5 rounded-md">Shopee Express</span>
                        </div>
                    </div>
                </div>

                {/* Arrow 3 */}
                <div className="flex items-center justify-center text-zinc-600 font-mono text-sm transform rotate-90 lg:rotate-0 py-1 font-bold">➔</div>

                {/* Step 4 */}
                <div className="flex-1 flex flex-col space-y-2">
                    <div className="text-xs md:text-sm font-semibold text-cyan-400 font-mono">4. ปรับเข้าบริบทกฎหมายไทย</div>
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-between items-center text-center space-y-4 backdrop-blur-xl shadow-inner min-h-[160px]">
                        <div className="text-xs text-zinc-300 leading-relaxed">วัดโครงสร้างพฤติกรรมตลาดจริงผ่านกรอบแนวทางปฏิบัติที่ไม่เป็นธรรมของ กขค.</div>
                        <div className="flex gap-1 flex-wrap justify-center">
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-md">แนวทาง กขค. / TCCT</span>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-md">ม. 50 & ม. 57</span>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="text-xs text-zinc-500 italic pt-2 border-t border-zinc-800/40">
                🚨 บทเรียนรวบยอด: แพลตฟอร์มมีสิทธิในทรัพย์สินระบบคอมพิวเตอร์ของตน แต่ไม่มีสิทธิใช้โครงสร้างพื้นฐานนั้นมาบิดเบือนกลไกตลาดเสรีเพื่อปิดกั้นคู่แข่ง
            </div>
        </div>
    ) : (
        /* โหมดแสดงผลตัวอักษรปกติสำหรับปุ่ม 3 (คงเดิมไว้ก่อนตามสเปก) */
        <div className="text-sm md:text-base text-zinc-200 leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none font-light">
            {legalResult.answer}
        </div>
    )}
</div>
      {legalResult.sources && legalResult.sources.length > 0 && (
                                    <div className="mt-6 pt-5 border-t border-zinc-800/60 space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                                            <BookOpen className="w-4 h-4 text-zinc-400" />
                                            <span>สืบค้นจากคลังข้อมูลกฎหมายที่น่าเชื่อถือ:</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {legalResult.sources.slice(0, 2).map((src: any, i: number) => (
                                                <a
                                                    key={i}
                                                    href={src.uri}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3.5 rounded-2xl bg-zinc-950/40 hover:bg-zinc-800/60 border border-zinc-800/50 hover:border-violet-500/30 transition-all flex items-start gap-2.5 group text-xs text-zinc-300"
                                                >
                                                    <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                                    <div className="truncate flex-1">
                                                        <span className="font-medium block text-zinc-100 group-hover:text-violet-300 transition-colors truncate">{src.title}</span>
                                                        <span className="text-zinc-500 text-[10px] block truncate mt-0.5">{src.uri}</span>
                                                    </div>
                                                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5 group-hover:text-zinc-300 transition-colors" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

{legalResult.mode !== 99 && legalResult.sourceUrl && (!legalResult.sources || legalResult.sources.length === 0) && (
                                    <div className="pt-4 border-t border-zinc-800/60 flex justify-end">
                                        <a
                                            href={legalResult.sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-600 hover:text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                                        >
                                            <span>สืบค้นแนวคำพิพากษาต้นฉบับ</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-2xl bg-[#09090c]/90 rounded-full px-6 py-3 border border-white/10 z-50 flex items-center gap-3 shadow-2xl shadow-black/80"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                    >
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                        </div>
                        <span className="text-xs md:text-sm text-zinc-300 font-medium">AI กำลังวิเคราะห์ปรับเข้าตัวบทกฎหมายและคลังคดี...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {inputFocused && (
                <motion.div
                    className="fixed w-[40rem] h-[40rem] rounded-full pointer-events-none z-0 opacity-[0.04] bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 blur-[120px]"
                    animate={{
                        x: mousePosition.x - 320,
                        y: mousePosition.y - 320,
                    }}
                    transition={{
                        type: "spring",
                        damping: 40,
                        stiffness: 150,
                        mass: 0.4,
                    }}
                />
            )}
        </div>
    );
}
