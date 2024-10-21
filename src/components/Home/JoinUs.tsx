import { Button } from "../ui/button";

export  function JoinUs() {
  return (
    <div className=" my-10">

      <div>Become a Operator earn reward</div>
      <div className="grid grid-cols-2 h-40">
        <div className=" col-span-1">

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
