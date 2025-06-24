type Props = {
  result: {
    data?: { message?: string };
    serverError?: string;
    validationErrors?: Record<string, string[]>;
  };
};

const MessageBox = ({ type, content }: { type: "success" | "error"; content: React.ReactNode }) => {
  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg ${
        type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {content}
    </div>
  );
};

export function DisplayServerActionResponse({ result }: Props) {
  console.log("DisplayServerActionResponse result:", result);
  if (!result) return null;

  const { data, serverError, validationErrors } = result;

  if (data?.message) {
    return <MessageBox type="success" content={data.message} />;
  }

  if (serverError) {
    return <MessageBox type="error" content={serverError} />;
  }

  if (validationErrors) {
    const errors = Object.entries(validationErrors).map(
      ([field, messages]) => `${field}: ${(Array.isArray(messages) ? messages : [messages]).join(", ")}`
    );
    return <MessageBox type="error" content={errors.join("; ")} />;
  }

  return null;
}
