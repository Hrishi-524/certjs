export const JAVASCRIPT_SNIPPET = `const job = await certjs.generate({
    recipients: [
        {
            name: "John Doe",
            score: 98,
        },
    ],
});

console.log(job);`;

export const PYTHON_SNIPPET = `job = certjs.generate(
    recipients=[
        {
            "name": "John Doe",
            "score": 98,
        }
    ]
)

print(job)`;

export const JAVA_SNIPPET = `Job job = certjs.generate(
    List.of(
        Map.of(
            "name", "John Doe",
            "score", 98
        )
    )
);

System.out.println(job);`;

export const C_SHARP_SNIPPET = `var job = await certjs.GenerateAsync(
    new[]
    {
        new
        {
            Name = "John Doe",
            Score = 98,
        }
    }
);

Console.WriteLine(job);`;