import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
  href?: string;
}

export default function Logo({
  className = "",
  showText = true,
  size = 32,
  href = "/",
}: LogoProps) {
  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/android-chrome-192x192.png"
        alt="url4irl logo"
        width={size}
        height={size}
        className="rounded-lg"
        priority
      />
      {showText && (
        <span className="text-xl font-bold text-foreground">url4irl</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
