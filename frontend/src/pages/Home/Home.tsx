import { Flex, Spin } from "antd";

import classes from "./Home.module.css";
import { Section } from "../../components/Section/Section";
import { Grants } from "../../components/Grants";
import { GrantsTable } from "../../components/GrantsTable/GrantsTable";
import { useGrantsMatchesQuery } from "../../api/grants";

export const HomePage = () => {
    const { data, loading } = useGrantsMatchesQuery();

    const { grantsMatches } = data || {};

    return (
        <Flex
            vertical
            justify={loading ? "center" : "start"}
            className={classes.wrapper}
        >
            {loading ? (
                <Spin />
            ) : (
                <>
                    {(grantsMatches?.length || 0) > 0 && (
                        <Section title="New matches">
                            <Grants />
                        </Section>
                    )}
                    <Section title="All Grant Opportunities">
                        <GrantsTable />
                    </Section>
                </>
            )}
        </Flex>
    );
};
