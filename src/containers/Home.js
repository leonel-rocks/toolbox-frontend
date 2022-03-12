import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Form,
  Pagination,
  Row,
  ThemeProvider,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Container from "../components/Container";
import Table from "../components/Table";

const toolBoxApiUrl = process.env.REACT_APP_TOOLBOX_API_URL;

const Home = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const { data: files } = useSelector((state) => state.files);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFileName(searchTerm);
    }, 1000);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const url = fileName
      ? `${toolBoxApiUrl}/files/data?fileName=${fileName}`
      : `${toolBoxApiUrl}/files/data`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "UPDATE_FILES",
          data,
        });
        setItems([...data.keys()]);
        setActive(0);
        setError(null);
      })
      .catch(function (error) {
        setError(error.message);
      });
  }, [dispatch, fileName]);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <Header>React Test App</Header>
      <Container>
        {files && (
          <div>
            <Row xs={1} md={3} className="g-3">
              <Col>
                <Form.Control
                  type="input"
                  placeholder="file.csv"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col>
                <Pagination>
                  {items.map((item) => (
                    <Pagination.Item
                      key={item}
                      active={item === active}
                      onClick={() => setActive(item)}
                    >
                      {item + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Col>
              <Col>
                <p
                  id="file-name"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >{`File Name: ${fileName ? fileName : files[active]?.file}`}</p>
              </Col>
            </Row>
            <Table
              columns={["File Name", "Text", "Number", "Hex"]}
              rows={files[active]?.lines}
            />
            {!error && !files[active]?.lines.length && (
              <Alert variant="info">No results were found.</Alert>
            )}
          </div>
        )}
        {error && (
          <Alert variant="warning">
            Something went wrong. Try again later.
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
