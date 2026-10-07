import React from 'react';
import { X, Volume2, BookOpen, Sparkles } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questions';
import { speakWord } from '../utils/audio';

interface VerbsTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerbsTableModal: React.FC<VerbsTableModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const exampleSentences: Record<string, string> = {
    go: 'I went to school yesterday.',
    do: 'He did his homework well.',
    see: 'She saw a beautiful bird.',
    write: 'The student wrote a letter.',
    is: 'The weather was cold last night.',
    drink: 'We drank fresh orange juice.',
    eat: 'They ate breakfast together.',
    sleep: 'The baby slept for eight hours.',
    find: 'I found my lost keys.',
    have: 'We had a great time.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#081A35] via-[#173B70] to-[#1E4C8F] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">
                جدول تصريف الأفعال في الماضي البسيط
              </h3>
              <p className="text-xs text-blue-200">
                قائمة الأفعال الشاذة المقررة في الاختبار مع أمثلة النطق
              </p>
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

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              اضغط على أيقونة الصوت <Volume2 className="w-3.5 h-3.5 inline mx-0.5 text-[#173B70]" /> لسماع النطق الإنجليزي الصحيح للفعل وجملته في الماضي البسيط.
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-[#173B70] text-white">
                <tr>
                  <th className="py-3 px-3 sm:px-4 font-black">#</th>
                  <th className="py-3 px-3 sm:px-4 font-black">المصدر (V1)</th>
                  <th className="py-3 px-3 sm:px-4 font-black">الماضي البسيط (V2)</th>
                  <th className="py-3 px-3 sm:px-4 font-black">المعنى بالعربية</th>
                  <th className="py-3 px-3 sm:px-4 font-black hidden md:table-cell">مثال في جملة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {QUESTIONS_DATA.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition">
                    <td className="py-3 px-3 sm:px-4 font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-sans font-bold text-[#081A35]">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => speakWord(item.verb)}
                          className="p-1 rounded-md text-slate-400 hover:text-[#173B70] transition"
                          title={`نطق ${item.verb}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span>{item.verb}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-sans font-black text-emerald-700 bg-emerald-50/40">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => speakWord(item.pastForm)}
                          className="p-1 rounded-md text-emerald-600 hover:text-emerald-800 transition"
                          title={`نطق ${item.pastForm}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span>{item.pastForm}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-bold text-slate-700">
                      {item.verbArabic}
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-sans text-xs text-slate-600 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakWord(exampleSentences[item.verb] || item.pastForm)}
                          className="p-1 rounded-md text-slate-400 hover:text-blue-600 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span>{exampleSentences[item.verb]}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-bold">
            تصميم الأستاذ نواف المتيوتي • نواف صالح
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#173B70] text-white text-xs font-bold hover:bg-[#112d57] transition cursor-pointer"
          >
            إغلاق الجدول
          </button>
        </div>
      </div>
    </div>
  );
};
