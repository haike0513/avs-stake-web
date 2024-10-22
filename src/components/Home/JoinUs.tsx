import { Button } from "../ui/button";

export  function JoinUs() {
  return (
    <div className=" my-10 p-4 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 h-40">
        <div className=" col-span-1">
          <div className=" text-xl font-medium">Become a Operator earn reward</div>
        </div>
        <div className=" col-span-1">
          <div>AOS is a AI interface verification and sampling network for Hetu protocol On Eigenlayer</div>
          <div className="flex gap-6 my-4">
            <Button>Docs</Button>

            <a href="https://forms.gle/QfGPy1oYJRHcrSm46" target="_blank">
              <Button>
              Contact US
              </Button>
            </a>

          </div>
        </div>

      </div>
      
    </div>
  );
}
