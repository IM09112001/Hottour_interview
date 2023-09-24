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

interface IUserOnePageProps {
  id: string;
}

const fields: TypedField[] = [


  {
    type: FieldType.Div,

    style: {
      display: 'grid',
      gridTemplateColumns: "150px auto",
      gap: "2rem",
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
            style: {
              width: '90%',
              height: '70%',
              maxWidth: '200px',
              background: 'rgba(73, 73, 73, 0.824)',
              margin: 'auto',
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
                // field:"",
                name: "userId",
                title: "User id",
                outlined: false,
                defaultValue: "evrv",
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "keyword",
                title: "keywords",

              },
            ],
          },
        ]

      },

    ]
  },

  {
    type: FieldType.Line,
    title: "Common info",
  },

  {
    type: FieldType.Text,
    name: "name",
    title: "name",
    defaultValue: "John",
  },

  {
    type: FieldType.Text,
    name: "surname",
    title: "surname",
    defaultValue: "Doe",
  },

  {
    type: FieldType.Date,

    title: "age",
    defaultValue: 33469,
  },
  {
    type: FieldType.Text,
    name: "title",
    title: "Title",
  },

  {
    type: FieldType.Expansion,
    title: 'Podpiska',
    description: 'Podpiske na uved',
    fields: [
      {
        type: FieldType.Switch,
        title: 'podpiska est',
        name: 'yes',
        defaultValue: true,
      },
      {
        type: FieldType.Switch,
        title: 'Podpiska net',
        name: 'No',
      },
    ],
  },

  {
    type: FieldType.Group,

    style: {},
    fields: [
      {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '6',
        fieldRightMargin: '0',
        style: {},
        fields: [
          {
            type: FieldType.Line,
            title: "Work",
          },

          {
            type: FieldType.Text,
            name: "position",
            title: "position",
            defaultValue: "front",

          },

          {
            type: FieldType.Text,
            name: "work_address",
            title: "work_adress",
            defaultValue: "alscmlascm",
          },
        ]
      },

      {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '6',
        fieldRightMargin: '0',
        style: {},
        fields: [
          {
            type: FieldType.Line,
            title: "Home",
          },

          {
            type: FieldType.Text,
            name: "country",
            title: "country",
            defaultValue: "uzb",
          },

          {
            type: FieldType.Text,
            name: "city",
            title: "city",
            defaultValue: "tash",
          },

          {
            type: FieldType.Text,
            name: "district",
            title: "district",
            defaultValue: "olm",
          },

          {
            type: FieldType.Text,
            name: "address",
            title: "address",
            defaultValue: "qiwneofvwiefo",
          },
        ]
      },

    ]
  }
];

export const UserOnePage = ({ id }: IUserOnePageProps) => {
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
          title="Список профилей"
          subtitle="Профиль"
          onSave={beginSave}
          onBack={() => history.push("/users_list")}
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

export default UserOnePage;
