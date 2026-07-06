import * as S from "./Footer.styles";

const Footer = () => {
	return (
		<S.FooterContainer>
			<S.FooterContent className="panel">
				<S.FooterBrand>github profiler</S.FooterBrand>
				<S.FooterSigns>scan.log.2026.07 • ce</S.FooterSigns>
			</S.FooterContent>
		</S.FooterContainer>
	);
};

export default Footer;
