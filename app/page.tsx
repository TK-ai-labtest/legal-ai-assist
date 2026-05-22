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
    const stepIndex = activeMode ? activeMode.stepIndex : 3;
    let answer = "";
    let sources: any[] = [];
    const sourceUrl = "https://www.deka.in.th";

    if (stepIndex === 1 || prompt.startsWith("/fact")) {
        answer = `⚖️ **[ผลการวิเคราะห์: จัดเรียงข้อเท็จจริง (Fact Extractor)]**\n\nจากการตรวจสอบข้อมูลเบื้องต้นที่ส่งเข้ามา สามารถจำแนกและสกัดข้อเท็จจริงสำคัญได้ดังนี้:\n\n• **ประเด็นฝั่งผู้เสียหาย (โจทก์):** ถูกบุคคลไม่ทราบชื่อเข้าถึงระบบจัดการฐานข้อมูล (Database) และทำการเปลี่ยนแปลงยอดหนี้สินทรัพย์ดิจิทัล\n• **พฤติกรรมผู้กระทำความผิด:** มีการลงบันทึกประวัติการขโมยเซสชันคุกกี้ (Session Hijacking) ในไฟล์บันทึกประวัติระบบ (System Log) เวลาประมาณ 03:15 น.\n• **มูลค่าความเสียหาย:** สูงกว่า 1,200,000 บาท\n• **หลักฐานทางนิติวิทยาศาสตร์:** ไฟล์รูปภาพการสนทนาตกลงซื้อขายสิทธิ์ และตารางประวัติคำร้องขอเรียกสืบค้นข้อมูลหลัก (Access Logs)`;
        sources = [
            { title: "แนวทางการรับฟังพยานหลักฐานดิจิทัล - ศาลยุติธรรม", uri: "https://www.coj.go.th" },
            { title: "ประมวลกฎหมายวิธีพิจารณาความอาญา มาตรา 226", uri: "https://www.krisdika.go.th" }
        ];
    } else if (stepIndex === 2 || prompt.startsWith("/category")) {
        answer = `⚖️ **[ผลการวิเคราะห์: จัดหมวดหมู่ข้อกฎหมาย (Legal Categorizer)]**\n\nการกระทำดังกล่าวเข้าข่ายความผิดตามบทบัญญัติแห่งกฎหมาย ดังต่อไปนี้:\n\n1. **พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 (และฉบับแก้ไขเพิ่มเติม)**\n   - **มาตรา 5:** การเข้าถึงระบบคอมพิวเตอร์ที่มีมาตรการป้องกันเฉพาะโดยมิชอบ\n   - **มาตรา 7:** การเข้าถึงข้อมูลคอมพิวเตอร์ที่ถูกจำกัดไว้โดยมิชอบ\n2. **ประมวลกฎหมายอาญา (Criminal Code)**\n   - **มาตรา 334 / 335 (๑):** ความผิดฐานลักทรัพย์ในเวลากลางคืน (หากเป็นการนำข้อมูลสิทธิ์เข้าบัญชีส่วนตัวและสั่งโอนออกทุจริต)\n\n• **ฎีกาอ้างอิงเทียบเคียง:** คำพิพากษาศาลฎีกาที่ 789/2565 (การดึงคีย์ระบบบัญชีไปควบคุมโดเมนโดยไม่มีอำนาจ)`;
        sources = [
            { title: "พระราชบัญญัติคอมพิวเตอร์ พ.ศ. 2560 - สำนักงานกฤษฎีกา", uri: "https://www.krisdika.go.th" },
            { title: "คลังข้อมูลกฎหมายคำตัดสินแนวผู้พิพากษาคดีไอที", uri: "https://www.deka.in.th" }
        ];
    } else if (stepIndex === 3 || prompt.startsWith("/reason")) {
        answer = `⚖️ **[ผลการวิเคราะห์: วินิจฉัยและฟันธง (Reasoning Engine)]**\n\n**การปรับบทวินิจฉัยเชิงลึก (Legal Reasoning):**\nการลักลอบโอนสิทธิ์และทรัพย์สินออนไลน์ผ่านช่องโหว่ทางเทคนิค โดยเจตนาเพื่อเอาไปเสียซึ่งทรัพย์สินของผู้อื่นโดยทุจริต เป็นการกระทำส่วนหนึ่งเพื่อการเข้าถึงระบบโดยไม่มีสิทธิ และเป็นการกระทำที่ทำให้เกิดความสูญเสียในทางกฎหมายแพ่งและพาณิชย์\n\n**ธงคำตอบแนวคำวินิจฉัย (Verdict Target):**\nพยานหลักฐานดิจิทัลประเภท IP Address และ Mac Address ประกอบกับ Log Files ของระบบ Cloud Server มีความสอดคล้องกันอย่างมั่นคง มีน้ำหนักพยานแน่นหนาเพียงพอที่จะชี้ว่าจำเลยกระทำความผิดจริงตามฟ้อง ศาลมีแนวโน้มตัดสินลงโทษจำเลยในฐานความผิดเข้าถึงคอมพิวเตอร์โดยมิชอบและลักทรัพย์อันเป็นกรรมเดียวผิดต่อกฎหมายหลายบท ลงโทษบทหนักที่สุดคือลักทรัพย์ในเวลากลางคืน จำคุกไม่เกิน 5 ปี`;
        sources = [
            { title: "มาตรฐานการประเมินน้ำหนักพยานหลักฐานสารสนเทศ", uri: "https://www.etda.or.th" },
            { title: "ฐานข้อมูลธงคำตัดสินคำถามเนติบัณฑิตยสภา คดีทรัพย์สินทางปัญญา", uri: "https://www.thethaibar.or.th" }
        ];
    } else {
        answer = `⚖️ **[สรุปรายงานอินโฟกราฟิกหน้าเดียว (Infographic Summary Dashboard)]**\n\n**ภาพรวมวิเคราะห์รูปคดี (Case Summary):**\n\n• 📈 **ระดับโอกาสชนะคดีของฝั่งผู้เสียหาย:** 88% (มีหลักฐานเชิงประจักษ์ทางไอทีสมบูรณ์)\n• 🔑 **ประเด็นข้อสู้หลักของคดี:** ฝ่ายจำเลยอาจอ้างเรื่อง "การระบุพิกัดที่ตั้งคลาดเคลื่อน" หรือ "บัญชีม้าถูกลักลอบนำไปเปิดใช้งาน" โจทก์ต้องนำสืบเส้นทางการเงินอย่างละเอียด\n• 🚨 **ข้อแนะนำเร่งด่วน:** ให้ทำการขอคำสั่งศาลตาม ป.วิ.อาญา มาตรา 132 เพื่อสั่งระงับธุรกรรมปลายทางชั่วคราว`;
        sources = [
            { title: "สรุปตัวเลขคดีภัยไซเบอร์รายปี - กองบัญชาการตำรวจสืบสวนสอบสวนอาชญากรรมทางเทคโนโลยี", uri: "https://www.ccib.go.th" }
        ];
    }

    return {
        answer,
        sourceUrl,
        sources,
        mode: stepIndex
    };
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
            icon: <FileText className="w-4 h-4 text-emerald-400" />,
            label: "จัดเรียงข้อเท็จจริง (Fact Extractor)",
            description: "สกัดสาระสำคัญและประเด็นแห่งคดีที่กระจัดกระจาย",
            prefix: "/fact",
            color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20 text-emerald-400",
            stepIndex: 1
        },
        {
            icon: <Layers className="w-4 h-4 text-amber-400" />,
            label: "จัดหมวดหมู่ข้อกฎหมาย (Legal Categorizer)",
            description: "คัดแยกฐานความผิด มาตรากฎหมาย และคลังฎีกาอ้างอิง",
            prefix: "/category",
            color: "from-amber-500/20 to-orange-500/5 border-amber-500/20 text-amber-400",
            stepIndex: 2
        },
        {
            icon: <Scale className="w-4 h-4 text-violet-400" />,
            label: "วิเคราะห์และฟันธง (Reasoning Engine)",
            description: "วินิจฉัยปรับบทกฎหมายและประเมินธงคำตอบเชิงลึก",
            prefix: "/reason",
            color: "from-violet-500/20 to-fuchsia-500/5 border-violet-500/20 text-violet-400",
            stepIndex: 3
        },
        {
            icon: <Presentation className="w-4 h-4 text-cyan-400" />,
            label: "สรุปอินโฟกราฟิก (Infographic Summary)",
            description: "ย่อยสรุปคดีความและระดับความมั่นใจใน 1 หน้าแดชบอร์ด",
            prefix: "/summary",
            color: "from-cyan-500/20 to-blue-500/5 border-cyan-500/20 text-cyan-400",
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
            if (isSandboxEnv()) {
                const simulatedData = await simulateLegalResponse(userPrompt, currentMode);
                setLegalResult(simulatedData);
            } else {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: userPrompt }),
                });

                const data = await response.json();

                if (data.error || !data.answer) {
                    setLegalResult({
                        answer: "เกิดข้อผิดพลาดในการดึงข้อมูลทางกฎหมาย หรือไม่พบข้อมูลคดีที่เกี่ยวข้องในคลังระบบครับ",
                        sourceUrl: null,
                        sources: [],
                        mode: currentMode?.stepIndex || 3
                    });
                } else {
                    setLegalResult({
                        answer: data.answer,
                        sourceUrl: data.sourceUrl || null,
                        sources: data.sources || [],
                        mode: currentMode?.stepIndex || 3
                    });
                }
            }
        } catch (err) {
            console.error(err);
            setLegalResult({
                answer: "ไม่สามารถเชื่อมต่อระบบประมวลผลนิติการได้ในขณะนี้ กรุณาลองใหม่อีกครั้งครับ",
                sourceUrl: null,
                sources: [],
                mode: currentMode?.stepIndex || 3
            });
        } finaly {
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

    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);
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
                                <Gavel className="w-4 h-4 text-violet-400" />
                                <span className="text-[10px] tracking-widest text-violet-300 font-mono uppercase font-bold">Legal Intelligence Platform</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/44 pb-2">
                                นิติการ AI assist
                            </h1>
                            <div className="w-48 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mx-auto rounded-full" />
                        </motion.div>
                        <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                            พิมพ์คดีหรือข้อพิพาทที่ประสงค์วิเคราะห์ หรือใช้คำสั่งลัด <code className="bg-white/5 px-2 py-1 rounded-lg text-violet-400 font-mono text-xs border border-white/5">/</code> เพื่อเลือกส่วนงานกฎหมายเฉพาะจุด
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 bg-white/[0.01] border border-white/5 p-2 rounded-2xl">
                        {commandSuggestions.map((cmd) => {
                            const isCurrent = currentMode?.prefix === cmd.prefix;
                            const isProcessed = legalResult && (legalResult.mode >= cmd.stepIndex);
                            return (
                                <div 
                                    key={cmd.prefix}
                                    className={cn(
                                        "flex flex-col items-center p-2 rounded-xl transition-all duration-300 text-center relative overflow-hidden",
                                        isCurrent ? "bg-violet-500/10 border border-violet-500/20" : "border border-transparent",
                                        isProcessed ? "opacity-100" : "opacity-40"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center mb-1",
                                        isCurrent ? "bg-violet-500/20" : isProcessed ? "bg-zinc-800" : "bg-transparent"
                                    )}>
                                        {cmd.icon}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-medium block truncate max-w-full text-zinc-300">
                                        {cmd.label.split(" (")[0]}
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

                                <div className="space-y-4">
                                    <div className="text-sm md:text-base text-zinc-200 leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none font-light">
                                        {legalResult.answer}
                                    </div>
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

                                {legalResult.sourceUrl && (!legalResult.sources || legalResult.sources.length === 0) && (
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
                        <span className="text-xs md:text-sm text-zinc-300 font-medium">นิติการ AI กำลังวิเคราะห์ปรับเข้าตัวบทกฎหมายและคลังคดี...</span>
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
