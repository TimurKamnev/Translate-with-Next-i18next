  import type { GetStaticProps, InferGetStaticPropsType } from "next";
  import { useTranslation } from "next-i18next";
  import { serverSideTranslations } from "next-i18next/serverSideTranslations";
  import Link from "next/link";
  import { useRouter } from "next/router";

  type Props = {};

  const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t } = useTranslation("common");
    const router = useRouter();

    const changeTo = router.locale === "en" ? "ru" : "en";

    return (
      <>
        <main>
          <h1>{t("title")}</h1>
          <p>{t("author")}</p>
          <Link href="/" locale={changeTo}>
            <button>{t('language')}</button>
          </Link>
        </main>
      </>
    );
  };

  export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  });

  export default Homepage;
