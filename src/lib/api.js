let url = "http://localhost:2525/";

export async function getAllProduct() {
  try {
    let response = await fetch(url + "uvdvFvQz1BXdWQC", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: "uvdvFvQz1BXdWQC" }),
    });
    let data = JSON.parse(await response.text());
    if (data?.data) {
      let cdata = JSON.parse(data.data);
      // console.log({ cdata });
      return cdata;
    }
  } catch (error) {
    console.error("error in getting product", error);
  }
}
