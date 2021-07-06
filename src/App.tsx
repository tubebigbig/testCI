import Button from "@material-ui/core/Button";
import { ButtonGroup } from "@material-ui/core";
import "./App.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MyContent } from "./themeContext";
import OwnContent from "./OwnContent";
import axios from "axios";

interface UserData {
  cell: string;
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: "male" | "female";
  id: {
    name: string;
    value: string;
  };
  location: {
    city: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    country: string;
    postcode: number;
    state: string;
    street: {
      number: number;
      name: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  login: {
    uuid: string;
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: string;
  };
}

interface RespData {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: UserData[];
}

//
function useCount(): [Number, () => void] {
  const [count, setCount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useCountEffect = () => {
    useEffect(() => {
      const myCount = setInterval(() => {
        setCount((e) => e + 1);
        console.log(count); // count will always 0
      }, 1000);
      return () => clearInterval(myCount);
    }, []);
  };
  // useCountEffect();
  const getCount = () => {
    console.log(count);
  };
  return [count, getCount];
}
const useFetchUserData = () => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://randomuser.me/api/?results=20");
      setUserdata(data);
      return data as RespData;
    } catch (err) {
      console.error(err);
    }
  };
  const [userData, setUserdata] = useState({} as RespData);

  useEffect(() => {
    fetchData().then((res) => {
      console.log(res);
    });
  }, []);

  return { userDatas: userData };
};

function App() {
  const [myContent, setMyContent] = useState(999);
  const [state, setState] = useState("");
  const [count, getCount] = useCount();
  const { userDatas } = useFetchUserData();
  const firstBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstBtn.current && firstBtn.current.click();
  }, [firstBtn]);

  // computed
  const doubleCount = useMemo(() => myContent ** 2, [myContent]);

  function alertIt2() {
    alert(`Count ${myContent}`);
  }

  const alertIt = useCallback(() => {
    alert(`Count ${myContent}`);
  }, [myContent]);

  function combineName(
    first: string,
    last: string,
    opt: {
      title?: string;
    } = {}
  ) {
    const { title } = opt;
    let result = "";
    if (title) result += title + ", ";
    return (result += first + last);
  }

  return (
    <MyContent.Provider value={{ text: myContent }}>
      <div>{count}</div>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <div className="App">
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="outlined primary button group"
          size="small"
          orientation="vertical"
          data-testid="button-group"
        >
          <Button ref={firstBtn} onClick={() => setMyContent(myContent + 1)}>
            One
          </Button>
          <Button onClick={getCount}>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </div>
      <MemoContext myprops="MemorizeMyComponent"/>
      <MemorizeMyComponent myprops="MemorizeMyComponent" />
      {doubleCount}
      <ul>
        {userDatas.results &&
          userDatas.results.map((user) => {
            return (
              <li key={user.login.uuid}>
                {combineName(user.name.first, user.name.last, {
                  title: user.name.title,
                })}
              </li>
            );
          })}
      </ul>
    </MyContent.Provider>
  );
}

const MemoContext = React.memo(OwnContent)

const MyComponent = ({ myprops }: { myprops: string }) => {
  const refCount = React.useRef(0);

  refCount.current++;

  return (
    <p>
      {myprops}, Ref Count: {refCount.current}
    </p>
  );
};

const MemorizeMyComponent = React.memo(MyComponent);


export default App;
