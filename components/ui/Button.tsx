export default function Button({ loading, children }: any) {
    return (
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
      >
        {loading ? "Please wait..." : children}
      </button>
    );
  }
  