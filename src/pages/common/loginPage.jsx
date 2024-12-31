import {Center, Flex, Heading, Input} from "@chakra-ui/react";
import {PasswordInput} from "@/components/ui/password-input.jsx";
import {useRef, useState} from "react";
import {Field} from "@/components/ui/field.jsx";
import {Button} from "@/components/ui/button.jsx"

export const LoginPage = () => {
   const inputEmail = useRef(null);
   const inputPassword = useRef(null);

   const handleSubmitLogin = () => {
       console.log(inputEmail.current.value, inputPassword.current.value);
   }
    return (
        <Center bgColor={'gray.100'} h={'100vh'}>
            <Flex gap={4} maxW={'40%'} bgColor={'white'} borderRadius={'lg'} p={'64px'} flexDir={'column'} justify>
                <Heading as={'h1'} size={'2xl'}>Login</Heading>
                <Field label="Email" errorText="This field is required">
                    <Input placeholder="Enter your email" variant={'subtle'} ref={inputEmail} />
                </Field>
                <Field label="Password" errorText="This field is required">
                    <PasswordInput placeholder="Enter your password" variant={'subtle'} ref={inputPassword} />
                </Field>
                <Button onClick={handleSubmitLogin}>Submit</Button>
            </Flex>
        </Center>
    )
}
