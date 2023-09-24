import {
  FetchView,
  RecordView,
  Breadcrumbs,
  ActionTrigger,
  FieldType,
  IActionTrigger,
  IField,
  useActionModal,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

import useLoader from "../../hooks/useLoader";

interface IUserRecordPageProps {
  id: string;
}

const updateFields: IField[] = [
  {
    type: FieldType.Text,
    name: "title",
    title: "Title",
    defaultValue: "New title",
  },
];

const cardActions: IActionTrigger[] = [
  {
    action: 'update-card',
    label: 'Update todo',
  },
];

export const UserRecordPage = ({ id }: IUserRecordPageProps) => {
  const { setLoader } = useLoader();

  const { pickData, render } = useActionModal({
    title: "Update todo",
    fields: updateFields,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
      return true;
    },
  });

  return (
    <>
      <FetchView
        state={async () => await fetchApi<ITodoItem>(`/users/${id}`)}
        onLoadStart={() => setLoader(true)}
        onLoadEnd={() => setLoader(false)}
      >
        {(todo) => (
          <>
            <Breadcrumbs
              title="User list"
              subtitle={todo.title}
              onBack={() => history.push("/users_card")}
            />
            <ActionTrigger
              sx={{ mb: 1 }}
              actions={cardActions}
              onAction={pickData}
            />
            <RecordView data={todo} />
          </>
        )}
      </FetchView>
      {render()}
    </>
  );
};

export default UserRecordPage;
