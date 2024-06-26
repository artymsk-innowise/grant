import { ConfigProvider } from "antd";

export const ThemeConfigProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#f08764",
                },
                components: {
                    Typography: {
                        titleMarginBottom: 0,
                        titleMarginTop: 0,
                    },
                    Layout: {
                        colorBgLayout: "#ffffff",
                    },
                    Divider: {
                        marginLG: 4,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};
