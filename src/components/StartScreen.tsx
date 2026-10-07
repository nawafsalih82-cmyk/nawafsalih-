import React, { useState } from 'react';
import { Play, Sparkles, Clock, CheckCircle2, Award, BookOpen, Smartphone, User, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface StartScreenProps {
  onStart: (studentName: string) => void;
  onOpenTable: () => void;
  onOpenAndroidCode: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onOpenTable,
  onOpenAndroidCode,
}) => {
  const [name, setName] = useState('');
  const { isInstallable, install } = usePWAInstall();

  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onStart(name.trim() || 'الطالب المتميز');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Hero Welcome Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100 overflow-hidden relative">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-br from-[#081A35] via-[#173B70] to-[#1E4C8F] text-white p-7 sm:p-9 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-400/10 rounded-full blur-xl -ml-12 -mb-12 pointer-events-none" />

          {/* Teacher & Designer Badges */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-4 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs sm:text-sm font-bold text-amber-300">
              تصميم الأستاذ نواف المتيوتي
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-xs sm:text-sm font-bold text-white">
              نواف صالح
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            تصريف الأفعال في الماضي البسيط
          </h2>

          {/* Subtitle */}
          <div className="mt-2 inline-block">
            <span className="text-lg sm:text-xl font-black text-amber-300 uppercase tracking-widest bg-white/10 px-4 py-1 rounded-xl border border-amber-300/30">
              Past Simple
            </span>
          </div>

          <p className="mt-3 text-sm text-blue-100/90 max-w-md mx-auto leading-relaxed">
            اختبار تفاعلي تدريبي لطلاب المرحلة التعليمية لإتقان تصريف الأفعال الشاذة والمنتظمة في زمن الماضي البسيط باللغة الإنجليزية
          </p>
        </div>

        {/* Form & Actions */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Optional Student Name Input */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-[#081A35] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#173B70]" />
                اسم الطالب / الطالبة (اختياري لشهادة النتيجة):
              </span>
              <span className="text-xs text-gray-400 font-normal">اختياري</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك هنا..."
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#173B70] focus:bg-white transition text-sm sm:text-base font-semibold shadow-inner"
                maxLength={40}
              />
            </div>
          </div>

          {/* Main Big Button: ابدأ الاختبار */}
          <button
            onClick={() => handleStart()}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-[#173B70] to-[#1E4C8F] hover:from-[#13305D] hover:to-[#173B70] active:scale-[0.98] text-white py-4 px-6 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-blue-900/25 transition-all duration-200 flex items-center justify-center gap-3 border border-blue-400/30 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <span>ابدأ الاختبار الآن</span>
          </button>

          {/* Quiz Rules & Specifications Card */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
            <h4 className="text-xs font-black text-[#173B70] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#173B70]" />
              مواصفات ونظام الاختبار:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-xs">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>30 ثانية لكل سؤال تنازلياً</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3 اختيارات وإجابة صحيحة واحدة</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>تأثيرات صوتية (تصفيق عند الصواب)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 shadow-xs">
                <Award className="w-4 h-4 text-purple-600 shrink-0" />
                <span>10 أفعال منتقاة بعناية للامتحانات</span>
              </div>
            </div>
          </div>

          {/* Quick Secondary Navigation */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onOpenTable}
              className="py-3 px-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-[#173B70] border border-blue-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#173B70]" />
              <span>جدول مراجعة الأفعال</span>
            </button>
            <button
              onClick={onOpenAndroidCode}
              className="py-3 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>مشروع Android Studio</span>
            </button>
          </div>

          {/* PWA Direct Installation Prompt if available */}
          {isInstallable && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-center justify-between gap-3">
              <div className="text-right">
                <div className="text-xs font-black text-amber-900">
                  هل ترغب بتثبيت التطبيق على جهاز الأندرويد؟
                </div>
                <div className="text-[11px] text-amber-700">
                  يعمل بدون إنترنت كأيقونة تطبيق كاملة على شاشتك
                </div>
              </div>
              <button
                onClick={install}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold text-xs shrink-0 shadow-sm"
              >
                تثبيت الآن
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center space-y-1">
        <p className="text-xs font-bold text-slate-500">
          تصميم وإشراف: الأستاذ نواف المتيوتي (نواف صالح)
        </p>
        <p className="text-[11px] text-slate-400">
          تطبيق أندرويد تعليمي متوافق مع Android 10 فما فوق
        </p>
      </div>
    </div>
  );
};
