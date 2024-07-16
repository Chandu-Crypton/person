
import {useState, FC} from 'react'
interface SubmissionInfoProps {
  formData?: any; // Adjust type as per your form data type
}

const DisplayPage: FC<SubmissionInfoProps> = ({ formData = {} }) => {
  return (
    <div>
      <h2>Submitted Form Data</h2>
      <ul>
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayPage;
