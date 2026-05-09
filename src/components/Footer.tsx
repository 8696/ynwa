import { FOOTER_COPYRIGHT_START, FOOTER_ICP, FOOTER_ICP_LINK } from '../config'

export default function Footer() {
  const y = new Date().getFullYear()

  return (
    <footer className="border-t border-[#e5e5ea] py-8 text-center text-[13px] font-normal text-[#8e8e93]">
      © {FOOTER_COPYRIGHT_START}–{y} &nbsp;|&nbsp;{' '}
      <a
        href={FOOTER_ICP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline text-inherit hover:opacity-70 transition-opacity duration-150"
      >
        {FOOTER_ICP}
      </a>
    </footer>
  )
}
