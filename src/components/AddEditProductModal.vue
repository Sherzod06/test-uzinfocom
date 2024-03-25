<template>
    <el-dialog
        v-model="dialogVisible"
        :title="isEdit ? 'Edit Product' : 'Add new Product'"
        width="800"
    >
        <Form as="el-form" :validation-schema="schema" :model="data" label-position="top">
            <el-row :gutter="16">
                <el-col :span="24">
                    <Field name="model" v-model="data.model" v-slot="{ value, field, errorMessage }">
                        <el-form-item label="Model" :error="errorMessage" required>
                            <el-input v-bind="field" :modelValue="value" :validate-event="false" autocomplete="off" placeholder="Model name"></el-input>
                        </el-form-item>
                    </Field>
                </el-col>
                <el-col :span="8">
                    <Field name="released_date" v-model="data.released_date" v-slot="{ value, field, errorMessage }">
                        <el-form-item label="Год релиза" :error="errorMessage" required>
                            <el-date-picker
                                style="width: 100%"
                                v-bind="field"
                                :modelValue="value"
                                type="date"
                                :validate-event="false"
                                placeholder="Released date"
                            />
                        </el-form-item>
                    </Field>
                </el-col>
                <el-col :span="8">
                    <Field name="category" v-model="data.category" v-slot="{ value, field, errorMessage }">
                        <el-form-item label="Category" :error="errorMessage" required>
                            <el-select v-bind="field" :modelValue="value" :validate-event="false" placeholder="Please select a category">
                                <el-option label="Zone No.1" value="shanghai" />
                                <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item>
                    </Field>
                </el-col>
                <el-col :span="8">
                    <Field name="price" v-model="data.price" v-slot="{ value, field, errorMessage }">
                        <el-form-item label="Рекомендуемая розничная цена" :error="errorMessage" required>
                            <el-input v-bind="field" :modelValue="value" :validate-event="false" autocomplete="off" placeholder="Price"></el-input>
                        </el-form-item>
                    </Field>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Описание товара" required>
                        <el-input v-model="data.description" type="textarea" :validate-event="false" autocomplete="off" placeholder="Model name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <Field name="is_visible" v-model="data.is_visible" v-slot="{ value, field, errorMessage }">
                        <el-form-item :error="errorMessage">
                            <el-checkbox v-bind="field" :modelValue="value" label="Видимость товара для пользователей магазина" size="large" />
                        </el-form-item>
                    </Field>
                </el-col>
                <el-col>
                    <el-upload
                        ref="upload"
                        class="upload-demo"
                        :action="`https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5`"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :auto-upload="false"
                        :on-success="onImageUploadSuccess"
                    >
                        <template #trigger>
                            <el-button type="primary">select file</el-button>
                        </template>
                        <el-button style="margin-left: 0.5rem;" type="success" @click="submitUpload">
                            upload to server
                        </el-button>
                        <template #tip>
                            <div class="el-upload__tip text-red">
                                limit 1 file, new file will cover the old file
                            </div>
                        </template>
                    </el-upload>
                </el-col>
            </el-row>
        </Form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types';
import { computed, ref, type PropType } from 'vue'
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    product: {
        type: Object as PropType<IProduct>,
        default: () => ({})
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

const schema = yup.object({
    model: yup.string().required().label("Model name"),
    released_date: yup.date().required().label("Released date"),
    price: yup.number().required().label("Рекомендуемая розничная цена"),
    category: yup.number().required().label("Category"),
    is_visible: yup.boolean().default(() => false)
});

const emits = defineEmits(['update:modelValue', 'onConfirm'])

const dialogVisible = computed({
    get() {
        return props.modelValue
    },
    set(newVal) {
        emits('update:modelValue', newVal)
    }
})

const data = ref<IProduct>({})

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

function onImageUploadSuccess(r:any, f:any) {
    console.log(r)
    console.log(f)

}
</script>

<style scoped>

</style>