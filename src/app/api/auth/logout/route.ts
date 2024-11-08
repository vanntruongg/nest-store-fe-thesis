import { cookies } from "next/headers";
import { HttpError } from "~/common/http-client";
import { logoutFromNextServer } from "~/modules/auth/services/AuthService";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  if (force) {
    const headers = new Headers();
    headers.append("Set-Cookie", `accessToken=; HttpOnly; Path=/; Secure`);
    headers.append(
      "Set-Cookie",
      `refreshToken=; HttpOnly; Path=/; Secure; SameSite=Strict`
    );
    return Response.json("Đăng xuất thành công", {
      status: 200,
      headers,
    });
  }

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return Response.json(
      { message: "Không nhận được access token" },
      { status: 400 }
    );
  }

  try {
    console.error("Lỗi 1");
    // const result = await logoutFromNextServer(accessToken.value);
    const response = await fetch(`http://localhost:9000/api/v1/api/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "Content-Type": "application/json",
      },
    });
    console.error("Lỗi 2");

    const headers = new Headers();
    headers.append("Set-Cookie", `accessToken=; HttpOnly; Path=/; Secure`);
    headers.append(
      "Set-Cookie",
      `refreshToken=; HttpOnly; Path=/; Secure; SameSite=Strict`
    );

    return Response.json(response, {
      status: 200,
      headers,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      console.error("Error during logout:", error); // Log chi tiết lỗi
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
