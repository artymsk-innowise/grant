import { Table } from "antd";
import { useSavedGrantsQuery } from "../../api/grants";

import { TABLE_COLUMNS } from "./GrantsTable.columns";
import classes from "./GrantsTable.module.css";

export const GrantsTable = () => {
    const { data } = useSavedGrantsQuery();
    const { savedGrants } = data || {};

    return (
        <Table
            dataSource={savedGrants}
            columns={TABLE_COLUMNS}
            rowKey={(record) => record._id}
            rowClassName={classes.row}
            bordered
        />
    );
};
