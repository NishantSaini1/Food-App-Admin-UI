export const loginService = async (payload: {
    email: string;
    password: string;
  }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (payload.email === "admin@food.com") {
          resolve({ name: "Admin", token: "fake-jwt-token" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };
  