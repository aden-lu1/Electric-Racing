/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useHistory } from 'react-router-dom';
import BootstrapTable, {
  ColumnDescription,
  RowEventHandlerProps,
  SortOrder
} from 'react-bootstrap-table-next';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../../../shared/routes';
import PageTitle from '../../../shared/page-title/page-title';
import styles from './change-requests-table.module.css';
import ActionButton from '../../../shared/action-button/action-button';

export interface DisplayChangeRequest {
  id: number;
  submitterName: string;
  wbsNum: string;
  type: string;
  dateReviewed: string;
  accepted: string;
  dateImplemented: string;
}

interface ChangeRequestsTableProps {
  changeRequests: DisplayChangeRequest[];
}

/**
 * Interactive table for displaying all change request data.
 */
const ChangeRequestsTable: React.FC<ChangeRequestsTableProps> = ({
  changeRequests
}: ChangeRequestsTableProps) => {
  const history = useHistory();

  // Configures display options for all data columns
  const columns: ColumnDescription[] = [
    { dataField: 'id', text: 'ID', align: 'center', sort: true },
    { dataField: 'submitterName', text: 'Submitter', align: 'left', sort: true },
    { dataField: 'wbsNum', text: 'WBS #', align: 'left', sort: true },
    { dataField: 'type', text: 'Type', align: 'left', sort: true },
    { dataField: 'dateReviewed', text: 'Reviewed', align: 'left', sort: true },
    { dataField: 'accepted', text: 'Accepted', align: 'center', sort: true },
    { dataField: 'dateImplemented', text: 'Implemented', align: 'left', sort: true }
  ];

  const defaultSort: [{ dataField: any; order: SortOrder }] = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ];

  // define what happens during various row events
  const rowEvents: RowEventHandlerProps = {
    onClick: (e, row, rowIndex) => {
      history.push(`/change-requests/${row.id}`);
    }
  };

  const actionButton = (
    <ActionButton link={routes.CHANGE_REQUESTS_NEW} icon={faPlus} text={'New Change Request'} />
  );

  return (
    <>
      <PageTitle title={'All Change Requests'} actionButton={actionButton} />
      <BootstrapTable
        striped
        hover
        condensed
        wrapperClasses={styles.table}
        bootstrap4={true}
        keyField="id"
        data={changeRequests}
        columns={columns}
        defaultSorted={defaultSort}
        rowEvents={rowEvents}
        noDataIndication="No Change Requests to Display"
        rowStyle={{ cursor: 'pointer' }} />
    </>
  );
};

export default ChangeRequestsTable;
