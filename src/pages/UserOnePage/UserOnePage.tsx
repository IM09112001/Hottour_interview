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


import IUserInfo from "../../model/IUserInfo";
import useLoader from "../../hooks/useLoader";
import { notEqual } from "assert";


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
            name: 'rating',
            defaultValue: 3,
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
            name: 'prefix',
            title: 'Пол',
            async itemList() {
              return [
                'male-unique-key',
                'female-unique-key',
                'female-miss-unique-key',
                'female-ms-unique-key',
              ];
            },
            async tr(current) {
              // await sleep(5e2);
              if (current === 'male-unique-key') {
                return 'Mr.';
              } else if (current === 'female-unique-key') {
                return 'Mrs.';
              } else if (current === 'female-miss-unique-key') {
                return 'Miss';
              } else if (current === 'female-ms-unique-key') {
                return 'Ms';
              } else {
                return "";
              }
            },
            defaultValue: 'their-unique-key',
          },

          {
            type: FieldType.Combo,
            title: 'Списки',
            name: 'suffix',
            async itemList() {
              return ['I', 'II', 'III', 'IV', 'V', 'VI', 'Sr.', 'PhD', 'MD', 'DDS'];
            },
            async tr(current) {
              // await sleep(5e2);
              if (current === 'I') {
                return 'I';
              } else if (current === 'II') {
                return 'II';
              } else if (current === 'III') {
                return 'III';
              } else if (current === 'IV') {
                return 'IV';
              } else if (current === 'V') {
                return 'V';
              } else if (current === 'VI') {
                return 'VI';
              } else if (current === 'Sr.') {
                return 'Sr.';
              } else if (current === 'PhD') {
                return 'PhD';
              } else if (current === 'MD') {
                return 'MD';
              } else if (current === 'DDS') {
                return 'DDS';
              } else {
                return "";
              }
            },
            defaultValue: 'their-unique-key',
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
                // readonly: true,
                name: "keyword",
                title: "User id",
                outlined: false,


              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "keywordChecked",
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
    name: "firstName",
    title: "name",
    description: "name",
  },

  {
    type: FieldType.Text,
    name: "lastName",
    title: "surname",
    description: "lastName",
  },

  {
    type: FieldType.Text,
    name: "age",
    title: "age",
    description: "42",
  },

  {
    type: FieldType.Expansion,
    title: 'Подписка',
    description: 'Подписка на уведомление',
    fields: [
      {
        type: FieldType.Switch,
        title: 'Подписка есть',
        name: 'subscribed',
        defaultValue: true,
      },
    ],
  },

  {
    type: FieldType.Group,

    style: {},

    // "email": "Bradford94@gmail.com",



    // "phonenumber": "414.736.3825 x7282",





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
            title: "Работа",
          },

          {
            type: FieldType.Text,
            name: "jobTitle",
            title: "Должность",
          },

          {
            type: FieldType.Text,
            name: "jobArea",
            title: "Место работы",
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
            title: "Домашний адрес",
          },

          {
            type: FieldType.Text,
            name: "country",
            title: "Страна",
          },

          {
            type: FieldType.Text,
            name: "city",
            title: "Город",
          },

          {
            type: FieldType.Text,
            name: "state",
            title: "обпасть",
          },

          {
            type: FieldType.Text,
            name: "address",
            title: "Адрес",
          },
        ]
      },

    ]
  }
];

export const UserOnePage = ({ id }: IUserOnePageProps) => {

  // const { setLoader } = useLoader();

  // const fetchState = (
  //   async () => await fetchApi("/users"),
  //   {
  //     onLoadStart: () => setLoader(true),
  //     onLoadEnd: () => setLoader(false),
  //   }
  // );

  const fetchState = () => [
    fetchApi<IUserInfo>(`/users/${id}`)
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
        <One<IUserInfo>
          handler={() => props.data}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(data) => <Content data={data} />}
    </FetchView>
  );
};

export default UserOnePage;
