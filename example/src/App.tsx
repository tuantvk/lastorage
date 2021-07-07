import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text } from 'react-native';
import { Appbar, TextInput, Button, Searchbar } from 'react-native-paper';
import Lastorage from 'lastorage';

const todos = new Lastorage('todos');
todos.init();

type IProps = {
  _id: string;
  name: string;
};

const App = () => {
  const [data, setData] = useState<IProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [text, setText] = useState<string>('');

  const findTodos = async () => {
    let todosLocal = await todos.find();
    setData(todosLocal);
  };

  useEffect(() => {
    findTodos();
  }, []);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const renderItem = ({ item }: { item: IProps }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  const handleSubmit = () => {
    if (text?.length) {
      todos.insert({ name: text });
      setText('');
      findTodos();
    }
  };

  const handleSearch = () => {
    let results = todos.find({ name: searchQuery });
    setData(results);
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Appbar.Header>
        <Appbar.Content title="Lastorage" />
      </Appbar.Header>
      <View style={styles.content}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={handleSearch}
        >
          {`Search`}
        </Button>
        <TextInput
          mode="outlined"
          label="Content"
          value={text}
          onChangeText={(value) => setText(value)}
          style={styles.input}
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={handleSubmit}
        >
          {`Submit`}
        </Button>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item._id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    padding: 15,
  },
  btnSubmit: {
    marginVertical: 15,
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 15,
  },
});

export default App;
