const displayAttributes = (obj) => {
  if (!obj || typeof obj !== "object") return null;

  const formatKey = (key) => {
    // Convert camelCase to Proper Case
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formattedAttributes = Object.keys(obj)
    .filter(
      (key) =>
        obj.hasOwnProperty(key) &&
        !key.includes("id") &&
        !key.includes("undefined") &&
        !key.includes("__v")
    )
    .map((key) => `${formatKey(key)}: ${obj[key]}`);

  return (
    <details>
      <ul>
        {formattedAttributes.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </details>
  );
};

export default displayAttributes;
