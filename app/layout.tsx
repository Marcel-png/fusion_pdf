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
        <meta name="google-adsense-account" content="ca-pub-8845765535417046" />
      </head>
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
