import React from 'react';
import { Volume2, VolumeX, BookOpen, Code2, Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTable: () => void;
  onOpenAndroidCode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenTable,
  onOpenAndroidCode,
}) => {
  const { isInstallable, install } = usePWAInstall();

  return (
    <header className="bg-gradient-to-r from-[#081A35] via-[#173B70] to-[#1E4C8F] text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-1.5 shadow-inner shrink-0">
              <img src="/icon.svg" alt="شعار التطبيق" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 shadow-sm">
                  نواف صالح
                </span>
                <span className="text-[11px] text-blue-200 hidden sm:inline">
                  Android 10+ Ready
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight leading-tight text-white mt-0.5">
                تصريف الأفعال - الماضي البسيط
              </h1>
              <p className="text-xs text-blue-200 font-medium">
                تصميم الأستاذ نواف المتيوتي
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Study Table Button */}
            <button
              onClick={onOpenTable}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 transition flex items-center gap-1.5 text-xs font-bold text-white shadow-sm"
              title="جدول الأفعال والمراجعة"
              aria-label="جدول الأفعال"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">جدول الأفعال</span>
            </button>

            {/* Android Studio Export */}
            <button
              onClick={onOpenAndroidCode}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 active:scale-95 border border-emerald-400/30 transition flex items-center gap-1.5 text-xs font-bold text-emerald-200 shadow-sm"
              title="كود Android Studio الكامل"
              aria-label="كود Android Studio"
            >
              <Code2 className="w-4 h-4 text-emerald-300" />
              <span className="hidden md:inline">كود أندرويد</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl transition border active:scale-95 ${
                soundEnabled
                  ? 'bg-white/15 hover:bg-white/25 border-white/20 text-white'
                  : 'bg-red-500/20 border-red-400/30 text-red-300'
              }`}
              title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
              aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-300" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* PWA Install */}
            {isInstallable && (
              <button
                onClick={install}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 transition flex items-center gap-1.5 text-xs font-black shadow-md"
                title="تثبيت التطبيق على هاتفك"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">تثبيت</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
