import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Smartphone, Terminal, HelpCircle } from 'lucide-react';
import { ANDROID_PROJECT_FILES } from '../data/androidProjectFiles';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = ANDROID_PROJECT_FILES[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#0B1528] text-white rounded-3xl shadow-2xl border border-blue-900/50 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#081A35] via-[#173B70] to-[#1E4C8F] p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Android 10+ (API 29+)
                </span>
                <span className="text-xs text-blue-200">Java & XML</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                مشروع Android Studio الكامل لإنتاج APK
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="bg-[#122442] px-4 py-2.5 text-xs text-blue-200 border-b border-white/5 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
            <span>الحزمة: <code className="text-amber-300 font-mono">com.nawaf.pastquiz</code> | اسم التطبيق: "الماضي البسيط"</span>
          </div>
          <div className="text-[11px] text-blue-300">
            تصميم الأستاذ نواف المتيوتي
          </div>
        </div>

        {/* Tabs for files */}
        <div className="flex overflow-x-auto gap-1 p-2 bg-[#081220] border-b border-white/5 scrollbar-thin shrink-0">
          {ANDROID_PROJECT_FILES.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => setActiveFileIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition flex items-center gap-1.5 ${
                activeFileIndex === idx
                  ? 'bg-[#173B70] text-white font-bold border border-blue-400/30 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        {/* Current File Path and Actions */}
        <div className="px-4 py-2.5 bg-[#0e1e36] flex items-center justify-between border-b border-white/5 shrink-0 text-xs">
          <div className="font-mono text-slate-300 truncate max-w-sm sm:max-w-md" dir="ltr">
            📁 {currentFile.path}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadFile}
              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تنزيل الملف</span>
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-[#060D17] font-mono text-xs text-slate-200 select-text leading-relaxed" dir="ltr">
          <pre className="whitespace-pre">{currentFile.content}</pre>
        </div>

        {/* Step-by-step Quick Guide */}
        <div className="bg-[#0c182c] p-3.5 border-t border-white/10 text-xs text-slate-300 space-y-1.5 shrink-0">
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>خطوات بناء الـ APK في أندرويد ستوديو:</span>
          </div>
          <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-slate-400">
            <li>افتح Android Studio واختر <strong>New Project &gt; Empty Views Activity</strong>.</li>
            <li>اجعل اسم المشروع <strong>NawafPastQuiz</strong> والحزمة <code className="text-amber-200">com.nawaf.pastquiz</code> واللغة <strong>Java</strong>.</li>
            <li>انسخ محتوى الملفات الستة أعلاه وضعها في أماكنها المحددة.</li>
            <li>ضع ملفي الصوت <code className="text-amber-200">applause.mp3</code> و <code className="text-amber-200">wrong.mp3</code> في مجلد <code className="text-amber-200">res/raw</code>.</li>
            <li>اضغط من القائمة العلوية على <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> لإنتاج ملف APK جاهز للتثبيت!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
