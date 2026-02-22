import { getCurrentYear, getFooterCopy } from "../utils/utils.js";

function Footer() {
  return (
    <div className="App-footer flex justify-center items-center border-t-4 border-[color:var(--main-color)] bottom-0">
      <p className="italic text-xl p-1">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </div>
  );
}

export default Footer;