import React from "react";
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Send,
  Video,
  Monitor,
  ExternalLink,
  Info,
  Smartphone,
  Globe,
  Mail,
} from "lucide-react";

const PrototypeGuidelinesPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase mb-3 text-blue-100 border border-white/20">
            <Info size={14} /> CS619 Virtual University Project
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Prototype Phase & Final Viva Guidelines
          </h1>
          <p className="mt-2 text-blue-100 max-w-2xl text-sm sm:text-base">
            Intended Readers: All students who are registered in a new project in Spring 2026.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-3 py-1.5 rounded-lg text-xs font-medium">
            <Globe size={14} />
            Frontend Local Host: <strong className="text-white font-mono">http://localhost:8001</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Part 1: Prototype Phase */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
                <FileText size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Part 1: Prototype Phase
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Critical Stage & Skill Evaluation
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                <strong>CS619 project team</strong> has taken additional measures to make students improve their software programming skills. Prototype phase carries marks and it is a critical stage in your project. So, a student must complete and then submit it within the due date and clear the Prototype phase viva. A student may or may not be allowed to proceed further based on the flow already provided here.
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="text-amber-800 dark:text-amber-300 font-medium text-xs sm:text-sm">
                  ⚠️ <strong>3rd Semester Policy:</strong> In case a student is not allowed to proceed further after Prototype Phase, such student will be given another chance after completion of 2 semesters in the project. Then such student can take CS619 course in 3rd semester starting from current semester, as per CS619 policy. Also such student shall keep working on all remaining parts of project on his own so that time can be saved in the 3rd semester.
                </p>
              </div>

              <p>
                The contents for learning material for Prototype phase shall be provided by respective project supervisor. For this purpose, students must contact respective project supervisor well ahead of starting date of Prototype Phase so that students can learn the programming skills before attempting Prototype Phase.
              </p>

              <p>
                The problem statement file for Prototype Phase will be updated on the mentioned start date of Prototype Phase under <strong>CS619 Assignments section</strong> on VULMS. If it is not there, then student should immediately contact the project supervisor.
              </p>
            </div>
          </div>

          {/* Submission Procedure */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Send size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Submission Procedure
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  VULMS Upload & File Formatting
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Complete Solution Folder:</strong> Students must attempt and submit their complete folder (Code/Database/Any other files related to Prototype Phase solution).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Development Tools:</strong> Use the development tools as per your project, consulting with your respective supervisor as required.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>VULMS Platform:</strong> Must submit the solution file within the due date on VULMS. No submission after the due date will be accepted.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>File Size Constraint:</strong> Make sure the uploaded file size is <strong>less than 50 MB</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Group Projects:</strong> Viva will be conducted on an individual basis, but the solution file shall be submitted by <strong>only one group member</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Activities After Submission & Viva */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg">
                <Video size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Activities After Submission & Viva
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Online Scheduling & Hardware Verification
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                After the submission of the solution file, students will be scheduled for viva on a working day. Students can attend this viva online from anywhere.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center gap-3 border border-gray-200 dark:border-gray-600">
                  <Monitor className="text-indigo-500" size={20} />
                  <div>
                    <div className="font-semibold text-xs text-gray-900 dark:text-white">Screen Sharing</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Supported OS & browser</div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center gap-3 border border-gray-200 dark:border-gray-600">
                  <Smartphone className="text-indigo-500" size={20} />
                  <div>
                    <div className="font-semibold text-xs text-gray-900 dark:text-white">Webcam & Audio</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Working Mic & Speaker</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-start gap-3">
                <Smartphone className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" size={20} />
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                    No Webcam? Use Android Phone as Webcam
                  </span>
                  <p className="text-indigo-700 dark:text-indigo-300">
                    If you don't have a hardware webcam, you can connect your mobile phone camera as a high-definition webcam.
                  </p>
                  <a
                    href="https://www.drivereasy.com/knowledge/use-android-phone-as-webcam/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
                  >
                    View Android Webcam Setup Guide <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info Cards */}
        <div className="space-y-6">
          {/* Localhost Port Quick Card */}
          <div className="bg-gradient-to-br from-slate-900 to-gray-800 text-white rounded-xl p-6 shadow-md border border-gray-700">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-blue-400">
              <Globe size={18} /> Frontend Port Config
            </h3>
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              The React Vite frontend server is pre-configured to launch on port <strong>8001</strong>.
            </p>
            <div className="p-3 bg-black/40 rounded-lg border border-white/10 font-mono text-xs text-emerald-400 space-y-1">
              <div># Local Access</div>
              <div className="text-white font-bold select-all">http://localhost:8001</div>
            </div>
          </div>

          {/* Deadline & Email Rules */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={18} /> Deadline & Email Rules
            </h3>

            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-3">
              <p>
                <strong>No Extended Date:</strong> The last date mentioned on VULMS will be final.
              </p>
              <p>
                <strong>No Direct Email:</strong> Email submission is only allowed if a verified upload error occurs on VULMS.
              </p>

              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900 space-y-2">
                <div className="font-semibold flex items-center gap-1.5 text-xs">
                  <Mail size={14} /> Backup Submission:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px]">
                  <li>Upload solution to Google Drive before due date.</li>
                  <li>Share drive link via email with supervisor.</li>
                  <li><strong>Must use official VU Student Email ID.</strong></li>
                </ol>
                <a
                  href="https://support.google.com/drive/answer/2424384?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold underline text-red-600 dark:text-red-400"
                >
                  Google Drive Help <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeGuidelinesPage;
