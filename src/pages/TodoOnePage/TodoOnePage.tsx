import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [


  {
    type: FieldType.Div,

    // type: FieldType.Group,
    style: {
      display: 'grid',
      gridTemplateColumns: "150px auto",
      gap: "5px",

    },
    fields: [
      {
        type: FieldType.Group,
        style: {
          display: "grid",
        },
        fields: [
          {
            type: FieldType.Box,
            // title: "System info",
            style: {
              width: '70px',
              height: '80px',
              background: 'white',
            },
          },
          {
            type: FieldType.Rating,

          }
        ]
      },

      {
        type: FieldType.Group,
        style: {},
        fields: [
          {
            type: FieldType.Line,
            title: "Profile",
          },

          {
            type: FieldType.Combo,
            name: 'gender',
            title: 'Gender',
            // freeSolo: true,
            async itemList() {
              // await sleep(1e3);
              return [
                'male-unique-key',
                'female-unique-key',
              ];
            },
            async tr(current) {
              // await sleep(5e2);
              if (current === 'male-unique-key') {
                return 'Male';
              } else if (current === 'female-unique-key') {
                return 'Female';
              } else {
                return "";
              }
            },
            defaultValue: 'their-unique-key',
          },

          {
            type: FieldType.Items,
            title: 'Lists',
            itemList: ['1-item', '2-item', '3-item']
          }
        ]

      },

    ]
  },

  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
    },
    fields: [
      {
        type: FieldType.Text,
        name: "userId",
        title: "User id",
        outlined: false,
        disabled: true,
      },
      {
        type: FieldType.Checkbox,
        fieldBottomMargin: "0",
        name: "completed",
        title: "Completed",
        disabled: true,
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "Common info",
  },
  {
    type: FieldType.Text,
    name: "title",
    title: "Title",
  },
];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [
    fetchApi<ITodoItem>(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
