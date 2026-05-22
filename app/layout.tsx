import React from "react";

export const metadata = {
  title: "กิ๊กเก๋า law AI assist",
  description: "ผู้ช่วยกฎหมายระดับสูงประมวลผลด้วย AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        {/* สั่งดึงช่างแต่งตัว Tailwind CSS มาสวมสไตล์ให้เว็บสวยงามทันที */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#09090b" }}>
        {children}
      </body>
    </html>
  );
}
