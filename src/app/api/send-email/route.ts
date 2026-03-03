import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";

const EMAIL_USER = "agustin.morro@gmail.com";
const EMAIL_PASS = "okhk eidh lzjh johf";

const transporter = createTransport({  // ← sin "nodemailer."
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { nombre, email, message } = await req.json();

  try {
    await transporter.sendMail({
      from: `"Faustino Oro" <${EMAIL_USER}>`,
      to: "oro.faustino@gmail.com",
      subject: `Mensaje de ${email} / FAUSTINO-APP /`,
      html: `
        <h1>Detalles del contacto:</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });
    return NextResponse.json({ message: "Correo enviado exitosamente" }, { status: 200 });
  } catch (err) {
    console.error("Error al enviar el correo:", err);
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
  }
}