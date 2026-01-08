"use client";

import { UsernameForm } from "@/components/username-form";
import { LoginSettings } from "@zitadel/proto/zitadel/settings/v2/login_settings_pb";
import { IdentityProvider } from "@zitadel/proto/zitadel/settings/v2/login_settings_pb";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  loginName: string | undefined;
  requestId: string | undefined;
  organization: string | undefined;
  loginSettings: LoginSettings | undefined;
  suffix: string | undefined;
  submit: boolean;
  allowRegister: boolean;
  identityProviders?: IdentityProvider[];
  loginSettingsGlobal?: LoginSettings;
};

export function LoginPage({
  loginName,
  requestId,
  organization,
  loginSettings,
  suffix,
  submit,
  allowRegister,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="space-y-4 text-center mb-8">
        <div 
          className="flex justify-center gap-10 text-[12px] font-semibold uppercase tracking-[0.45rem]"
          role="tablist"
          aria-label="Login or Sign Up"
        >
          <button
            className={activeTab === "signup" ? "text-primary-light-500 dark:text-primary-dark-500" : "text-gray-400 dark:text-gray-500 transition hover:text-primary-light-400 dark:hover:text-primary-dark-400"}
            onClick={() => setActiveTab("signup")}
            type="button"
            role="tab"
            aria-selected={activeTab === "signup"}
            aria-controls="signup-panel"
            id="signup-tab"
          >
            Sign Up
          </button>
          <button
            className={activeTab === "login" ? "text-primary-light-500 dark:text-primary-dark-500" : "text-gray-400 dark:text-gray-500 transition hover:text-primary-light-400 dark:hover:text-primary-dark-400"}
            onClick={() => setActiveTab("login")}
            type="button"
            role="tab"
            aria-selected={activeTab === "login"}
            aria-controls="login-panel"
            id="login-tab"
          >
            Login
          </button>
        </div>
        <div className="relative mx-auto h-[2px] w-64 max-w-full bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute top-0 h-full w-1/2 bg-primary-light-500 dark:bg-primary-dark-500 transition-transform"
            style={{
              transform:
                activeTab === "signup" ? "translateX(0%)" : "translateX(100%)",
            }}
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === "login" ? (
        <div
          role="tabpanel"
          id="login-panel"
          aria-labelledby="login-tab"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Enter your details to access your account</p>
          </div>
          <UsernameForm
            loginName={loginName}
            requestId={requestId}
            organization={organization}
            loginSettings={loginSettings}
            suffix={suffix}
            submit={submit}
            allowRegister={allowRegister}
          />
        </div>
      ) : (
        <div 
          className="flex flex-col items-center space-y-6 py-8"
          role="tabpanel"
          id="signup-panel"
          aria-labelledby="signup-tab"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Join Uyir</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
            Create an account to start your professional journey.
          </p>
          <button
            onClick={() => {
              const registerParams = new URLSearchParams();
              if (organization) registerParams.append("organization", organization);
              if (requestId) registerParams.append("requestId", requestId);
              router.push("/register?" + registerParams);
            }}
            className="flex w-full items-center justify-center rounded-full bg-primary-light-500 dark:bg-primary-dark-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-light-400 dark:hover:bg-primary-dark-400"
          >
            Continue to Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
