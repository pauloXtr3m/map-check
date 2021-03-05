import React, { useCallback, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Container, RowBottom } from './styles';
import { colors } from '../../styles/colors';
import TextTitle from '../../components/TextTitle';
import { ActionButton } from '../../components/ActionButton';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useNotes } from '../../hooks/notes';

interface NoteData {
  note: string;
}

const CreateNote: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();
  const { save } = useNotes();

  const handleSubmit = useCallback(
    async (data: NoteData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          note: Yup.string().required('Nota é obriória'),
        });

        await schema.validate(data, { abortEarly: false });

        await save(data.note);
        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          Alert.alert(
            'Preencha os campos corretamente',
            'Preencha todos os campos e tente novamente',
          );
          return;
        }

        Alert.alert(
          'Erro ao salvar nota',
          'Ocorreu um erro ao salvar a nota, verifique sua conexão com a internet',
        );
      }
    },
    [save],
  );

  return (
    <LinearGradient colors={colors.default} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <TextTitle>Crie a sua anotação</TextTitle>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="note"
                icon="book-open"
                multiline
                numberOfLines={10}
              />
            </Form>
            <RowBottom full withSpaceBetween>
              <ActionButton backgroundColor="white" onPress={goBack}>
                <Icon name="arrow-left" size={30} />
              </ActionButton>
              <ActionButton
                backgroundColor={colors.accent}
                onPress={() => formRef.current?.submitForm()}
              >
                <Icon name="save" size={30} />
              </ActionButton>
            </RowBottom>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default CreateNote;
