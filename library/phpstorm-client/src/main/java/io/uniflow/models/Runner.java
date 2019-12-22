package io.uniflow.models;

import com.eclipsesource.v8.V8Object;
import com.intellij.openapi.actionSystem.AnActionEvent;

import com.eclipsesource.v8.V8;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.uniflow.bridges.Console;
import io.uniflow.bridges.Filesystem;
import io.uniflow.bridges.Phpstorm;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Runner {
    public void run(JsonArray rail, AnActionEvent event) {

        //Get all the required data from data keys
        /*final Editor editor = e.getRequiredData(CommonDataKeys.EDITOR);
        final Project project = e.getProject();
        //Access document, caret, and selection
        final Document document = editor.getDocument();
        final SelectionModel selectionModel = editor.getSelectionModel();
        final int start = selectionModel.getSelectionStart();
        final int end = selectionModel.getSelectionEnd();

        WriteCommandAction.runWriteCommandAction(project, () -> {
            try {
                String path = "/js/bundle.js";
                String javascript = getFileTemplateContent(path);
                Code javaObj = new Code();

                ScriptEngineManager engineManager = new ScriptEngineManager();
                ScriptEngine engine = engineManager.getEngineByName("nashorn");
                ScriptContext context = engine.getContext();
                context.setAttribute("javaObj", javaObj, ScriptContext.ENGINE_SCOPE);

                Object result = engine.eval(javascript);
                String text = result.toString();
                document.replaceString(start, end, text);
            } catch (ScriptException | IOException exception) {
                exception.printStackTrace();
            }
        });
        selectionModel.removeSelection();

        // bridge-phpstorm = new Phpstorm(event)
        */

        V8 vm = V8.createV8Runtime();

        // console bridge
        Console console = new Console();
        V8Object v8Console = new V8Object(vm);
        vm.add("console", v8Console);
        v8Console.registerJavaMethod(console, "log", "log", new Class<?>[] { String.class });
        v8Console.registerJavaMethod(console, "error", "error", new Class<?>[] { String.class });
        v8Console.release();

        // phpstorm bridge
        Phpstorm phpstorm = new Phpstorm(event);
        V8Object v8Phpstorm = new V8Object(vm);
        vm.add("phpstorm", v8Phpstorm);
        v8Phpstorm.registerJavaMethod(phpstorm, "getCurrentFilePath", "getCurrentFilePath", new Class<?>[] {});
        v8Phpstorm.release();

        // filesystem bridge
        Filesystem filesystem = new Filesystem();
        V8Object v8Filesystem = new V8Object(vm);
        vm.add("filesystem", v8Filesystem);
        v8Filesystem.registerJavaMethod(filesystem, "read", "read", new Class<?>[] { String.class });
        v8Filesystem.release();

        for (int i = 0; i < rail.size(); i++) {
            JsonObject flow = rail.get(i).getAsJsonObject();
            String code = flow.get("codes").getAsJsonObject().get('phpstorm').getAsString();
            vm.executeScript(code);
        }

        vm.release(true);
    }
}