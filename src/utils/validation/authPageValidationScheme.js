const validationSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1 },
        email: { type: "string" },
        password: { type: "string", minLength: 1 },
    },
    required: ["name", "email", "password"],
    additionalProperties: false,
};

export default validationSchema;