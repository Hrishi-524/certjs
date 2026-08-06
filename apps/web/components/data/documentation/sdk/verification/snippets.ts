export const JAVASCRIPT_SNIPPET = `const certificate = await certjs.verify(
    "VERIFY_TOKEN"
);

console.log(certificate);`;

export const PYTHON_SNIPPET = `certificate = certjs.verify(
    "VERIFY_TOKEN"
)

print(certificate)`;

export const JAVA_SNIPPET = `Certificate certificate =
    certjs.verify("VERIFY_TOKEN");

System.out.println(certificate);`;

export const C_SHARP_SNIPPET = `var certificate =
    await certjs.VerifyAsync(
        "VERIFY_TOKEN"
    );

Console.WriteLine(certificate);`;