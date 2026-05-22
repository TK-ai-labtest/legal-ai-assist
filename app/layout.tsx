import React from "react";

export const metadata = {
  title: "นิติการ AI assist",
  description: "ผู้ช่วยกฎหมายระดับสูงประมวลผลด้วย AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#09090b" }}>
        {children}
      </body>
    </html>
  );
}
