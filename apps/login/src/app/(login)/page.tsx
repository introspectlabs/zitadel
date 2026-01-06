import { DynamicTheme } from "@/components/dynamic-theme";
import { getServiceConfig } from "@/lib/service-url";
import { getActiveIdentityProviders, getBrandingSettings, getDefaultOrg, getLoginSettings } from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { headers } from "next/headers";
import { LoginPage } from "./login-page"; // Client component

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  const loginName = searchParams?.loginName;
  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;
  const suffix = searchParams?.suffix;
  const submit: boolean = searchParams?.submit === "true";

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let defaultOrganization;
  if (!organization) {
    const org: Organization | null = await getDefaultOrg({ serviceConfig, });
    if (org) {
      defaultOrganization = org.id;
    }
  }

  const loginSettings = await getLoginSettings({ serviceConfig, organization: organization ?? defaultOrganization,
  });

  const contextLoginSettings = await getLoginSettings({ serviceConfig, organization,
  });

  const identityProviders = await getActiveIdentityProviders({ serviceConfig, orgId: organization ?? defaultOrganization,
  }).then((resp) => {
    return resp.identityProviders;
  });

  const branding = await getBrandingSettings({ serviceConfig, organization: organization ?? defaultOrganization,
  });

  return (
    <DynamicTheme branding={branding}>
       <LoginPage
          loginName={loginName}
          requestId={requestId}
          organization={organization}
          loginSettings={contextLoginSettings}
          suffix={suffix}
          submit={submit}
          allowRegister={!!loginSettings?.allowRegister}
          identityProviders={identityProviders}
          loginSettingsGlobal={loginSettings}
       />
    </DynamicTheme>
  );
}
