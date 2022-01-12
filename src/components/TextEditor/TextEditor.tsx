import React, { useEffect, useState } from "react";

import { FormikProps } from "formik";
import ReactMarkdown from "react-markdown";
import Button from "components/Button/Button";
import { Thread } from "types";
import { useNavigate, useParams } from "react-router";
import Editor from "rich-markdown-editor";

import { kontenbase } from "lib/client";

type Props = React.PropsWithChildren<{
  formik: FormikProps<Thread>;
  loading: boolean;
  deleteDraft: () => void;
}>;

function TextEditor({ formik, loading, deleteDraft }: Props) {
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const isDisabled =
    !formik.values.name ||
    !formik.values.content ||
    !!formik.errors.name ||
    !!formik.errors.content ||
    loading;

  return (
    <div className="flex flex-col h-full ">
      <div></div>
      <div className="flex flex-col h-full min-h-0">
        <input
          className="w-full h-auto outline-none text-3xl font-bold mb-4"
          placeholder="Thread title"
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
        />

        {!preview && (
          <Editor
            onChange={(getContent) =>
              formik.setFieldValue("content", getContent())
            }
            onBlur={() => formik.handleBlur("content")}
            defaultValue={formik.values.content}
            uploadImage={async (file: File) => {
              const { data } = await kontenbase.storage.upload(file);
              return data.url;
            }}
            className="markdown-overrides"
          />
        )}

        {preview && <Editor value={formik.values.content} readOnly />}
      </div>
      <div className="w-full flex justify-between items-center">
        <div></div>
        <div className="flex gap-2">
          <Button
            className={` hover:bg-neutral-200 rounded text-xs font-medium px-5 ${
              !preview ? "text-cyan-500" : "text-white bg-cyan-500"
            }`}
            onClick={() => {
              setPreview((prev) => !prev);
            }}
          >
            Preview
          </Button>

          <Button
            className=" hover:bg-neutral-200 rounded text-xs font-medium px-5"
            onClick={() => {
              deleteDraft();
              navigate(`/a/${params?.workspaceId}/ch/${params?.channelId}`);
            }}
          >
            Discard
          </Button>
          <Button
            type="submit"
            className=" bg-cyan-500 hover:bg-cyan-600 rounded text-xs font-medium px-5 text-white"
            disabled={isDisabled}
            onClick={formik.handleSubmit}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
