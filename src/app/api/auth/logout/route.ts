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
    const result = await logoutFromNextServer(accessToken.value);

    const headers = new Headers();
    headers.append("Set-Cookie", `accessToken=; HttpOnly; Path=/; Secure`);
    headers.append(
      "Set-Cookie",
      `refreshToken=; HttpOnly; Path=/; Secure; SameSite=Strict`
    );

    return Response.json(result, {
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
