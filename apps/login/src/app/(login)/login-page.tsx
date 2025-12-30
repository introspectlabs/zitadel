"use client";

import { useState } from "react";
import { UsernameForm } from "@/components/username-form";
import { SignInWithIdp } from "@/components/sign-in-with-idp";
import { useRouter } from "next/navigation";

export function LoginPage({
  loginName,
  requestId,
  organization,
  loginSettings,
  suffix,
  submit,
  _allowRegister,
  identityProviders,
  loginSettingsGlobal,
}: any) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const router = useRouter();

  return (
    <div className="w-full">
        {/* Tabs */}
        <div className="space-y-4 text-center mb-8">
            <div className="flex justify-center gap-10 text-[12px] font-semibold uppercase tracking-[0.45rem]">
            <button
                className={activeTab === "signup" ? "text-[#1e0e62]" : "text-[#15143966] transition hover:text-[#6c5ce7]"}
                onClick={() => setActiveTab("signup")}
                type="button"
            >
                Sign Up
            </button>
            <button
                className={activeTab === "login" ? "text-[#1e0e62]" : "text-[#15143966] transition hover:text-[#6c5ce7]"}
                onClick={() => setActiveTab("login")}
                type="button"
            >
                Login
            </button>

            </div>
            <div className="relative mx-auto h-[2px] w-64 max-w-full bg-[#ebeaed]">
            <div
                className={`absolute top-0 h-full w-1/2 bg-[#6c5ce7] transition-transform`}
                style={{
                transform:
                    activeTab === "signup" ? "translateX(0%)" : "translateX(100%)",
                }}
            />
            </div>
        </div>

        {/* Content */}
        {activeTab === "login" ? (
            <>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1e0e62] text-center mb-2">Welcome Back</h1>
                    <p className="text-sm text-[#15143999] text-center">Enter your details to access your account</p>
                </div>
                <UsernameForm
                    loginName={loginName}
                    requestId={requestId}
                    organization={organization}
                    loginSettings={loginSettings}
                    suffix={suffix}
                    submit={submit}
                    allowRegister={false} // Hide default register link since we have tabs
                />
            </>
        ) : (
             <div className="flex flex-col items-center space-y-6 py-8">
                <h1 className="text-2xl font-bold text-[#1e0e62]">Join Uyir</h1>
                <p className="text-sm text-[#15143999] text-center max-w-xs">
                    Create an account to start your professional journey.
                </p>
                 <button
                    onClick={() => {
                        const registerParams = new URLSearchParams();
                        if (organization) registerParams.append("organization", organization);
                        if (requestId) registerParams.append("requestId", requestId);
                        router.push("/register?" + registerParams);
                    }}
                    className="flex w-full items-center justify-center rounded-full bg-[#6c5ce7] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(108,92,231,0.3)] transition hover:bg-[#5a4bcf]"
                >
                    Continue to Sign Up
                </button>
             </div>
        )}

       {loginSettingsGlobal?.allowExternalIdp && !!identityProviders?.length && (
          <div className="w-full pb-4 pt-6">
            <SignInWithIdp
              identityProviders={identityProviders}
              requestId={requestId}
              organization={organization}
              postErrorRedirectUrl="/loginname"
            ></SignInWithIdp>
          </div>
        )}
    </div>
  );
}
