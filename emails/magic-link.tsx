import { assetsURL } from "@/lib/urlHelper";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  magicLink?: string;
}

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${assetsURL}/logo.png`}
          width={48}
          height={48}
          alt="Starry Pal"
        />
        <Heading style={heading}>🪄 Your magic link</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link
              style={{ ...link, textAlign: "center" as const }}
              href={magicLink}
            >
              👉 Click here to sign in 👈
            </Link>
          </Text>
          <Text
            style={paragraph}
          >{`If you didn't request this, please ignore this email.`}</Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Starry Pal Team
        </Text>
        <Hr style={hr} />
        <Img src={`${assetsURL}/logo.png`} width={32} height={32} />
        <Text style={footer}>Starry Pal.</Text>
        <Text style={footer}>Web Address....</Text>
      </Container>
    </Body>
  </Html>
);
MagicLinkEmail.PreviewProps = {
  magicLink: "https://raycast.com",
} as MagicLinkEmailProps;

export default MagicLinkEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FFFFFF",
  textDecoration: "underline",
  backgroundColor: "#3c00a0",
  padding: "8px 12px",
  fontSize: "16px",
  borderRadius: "6px",
  fontWeight: "bold",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
  display: "inline-block",
  textAlign: "center",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
