/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useParams } from 'react-router-dom';
import { useSingleChangeRequest } from '../../services/change-requests';
import ChangeRequestDetailsView from '../../components/change-request-details/change-request-details';
import './change-request-details.module.css';

const ChangeRequestDetails: React.FC = () => {
  interface ParamTypes {
    id: string;
  }
  const { id } = useParams<ParamTypes>();
  const { isLoading, errorMessage, responseData } = useSingleChangeRequest(parseInt(id));

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (errorMessage !== '' || responseData === undefined) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{errorMessage ? errorMessage : 'The data did not load properly.'}</p>
      </>
    );
  }
  return <ChangeRequestDetailsView changeRequest={responseData!} />;
};

export default ChangeRequestDetails;