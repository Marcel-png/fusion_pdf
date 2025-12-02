import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Fusion PDF",
  description: "Une application web qui change votre quotidien.  Fini les casse tête pour pouvoir fusionner deux ou plusieurs fichiers pdf en un seul fichier pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8845765535417046"
     crossorigin="anonymous"></script>
</head>
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
