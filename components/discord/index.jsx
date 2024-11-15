import { useTranslations } from 'next-intl'

export default function Discord() {
    const p = useTranslations('page')

    return (
        <>
            <h4 className="bostami-parsonal-info-title mb-15">
                Discord community
            </h4>

            <div className="bostami-contact-2-wrap">
                <div className="row"></div>
            </div>

            <div className="footer-copyright text-center pt-25 pb-25 mt-50">
                <span style={{ fontSize: 16 }}>
                    ©{new Date().getFullYear()} {p('copy')}{' '}
                    <span style={{ fontFamily: 'Adrip', fontSize: 32 }}>
                        <span style={{ fontSize: 48 }}>c</span>ode$toryBro
                    </span>
                </span>
            </div>
        </>
    )
}
