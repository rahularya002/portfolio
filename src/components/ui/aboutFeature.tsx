export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Features</h2>
        <h1 className="text-4xl font-bold mt-2">Blazingly fast to help your business grow</h1>
      </div>
      <div className="flex flex-col-reverse items-center justify-center mt-8 md:flex-row md:space-x-8">
        <div className="space-y-8 mt-8 md:mt-0">
          <div className="border-l-4 pl-4">
            <h3 className="text-xl font-bold">Innovative Design</h3>
          </div>
          <div className="border-l-4 pl-4">
            <h3 className="text-xl font-bold">User-Centric Approach</h3>
            <p className="text-sm mt-2">We prioritize the needs and preferences of our users in our design process.</p>
          </div>
          <div className="border-l-4 pl-4">
            <h3 className="text-xl font-bold">Seamless Integration</h3>
          </div>
          <div className="border-l-4 pl-4">
            <h3 className="text-xl font-bold">Continuous Improvement</h3>
          </div>
        </div>
        //
        <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
          <img
            src="/placeholder.svg"
            alt="Sunset over the beach"
            className="w-full h-auto"
            width="400"
            height="300"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  )
}